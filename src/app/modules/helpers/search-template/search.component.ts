import {Component, ElementRef, HostBinding, Input, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "src/app/store";
import * as fromSelectors from "src/app/store/selector";
import * as fromActions from "src/app/store/action";
import {SearchByModel, SearchHintModel, SearchParamsModel, SearchQueryModel} from "src/app/models/searchQueryModel";
import {TfOrCl} from "src/app/models/data.model";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {FileSaverService} from "ngx-filesaver";
import * as moment from "moment";
import {SearchService} from "../../../services/search.service";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: "asb-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.less"],
})
export class SearchComponent implements OnInit {
    @HostBinding("class.asb-search")
    private readonly cssClass = true;

    @ViewChild("clInput") clInput: ElementRef<HTMLInputElement>;
    @ViewChild("autoCl") autocompleteCl: MatAutocomplete;

    @ViewChild("tfInput") tfInput: ElementRef<HTMLInputElement>;
    @ViewChild("autoTf") autocompleteTf: MatAutocomplete;
    private readonly nullValue: {searchInput: string} = {searchInput: ""};
    @Input()
    public width: "restricted" | "full";

    @Input()
    public isAdvanced: boolean;

    public searchForm: FormGroup;
    separatorKeysCodes: number[] = [ENTER, COMMA];

    advancedSearchOptions: {value: string, view: string}[] = [
        {view: "Genome position", value: "pos"},
        {view: "Transcription factors", value: "tf"},
        {view: "Cell types", value: "cl"},
    ]
    ;
    private searchParams: SearchParamsModel;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<AppState>,
        private router: Router,
        private route: ActivatedRoute,
        private titleService: Title,
        private saverService: FileSaverService,
        private searchService: SearchService,
        private toastr: ToastrService,
    ) {}

    public listOfChrs: string[] = [];
    public searchOptions$: Observable<{tf: SearchHintModel[], cl: SearchHintModel[]}>;
    public searchOptionsLoading$: Observable<{ tf: boolean, cl: boolean }>;


    ngOnInit() {
        this.titleService.setTitle(this.route.snapshot.data.title);
        for (let i = 1; i < 22; i++) {
            this.listOfChrs.push(String(i));
        }
        this.listOfChrs.push("X");
        this.searchForm = this.formBuilder.group({
            searchInput: "",
            searchBy: "id",
            chromosome: "1",
            searchByArray: [["tf", "cl", "pos"]],
            searchTf: null,
            searchCl: null,
            tfList: [["CTCF_HUMAN"]],
            clList: [[]],
        }, {
                validator: matchingPattern("searchInput",
                    "searchBy", "searchByArray", this.isAdvanced),
            }
        );
        this.searchParams = this.route.snapshot.queryParams as SearchParamsModel;
        this.searchForm.patchValue(
            this._convertParams(this.searchParams)
        );
        this.searchOptions$ = this.store.select(fromSelectors.selectCurrentSearchOptions);
        this.searchOptionsLoading$ = this.store.select(fromSelectors.selectCurrentSearchOptionsLoading);

        this.searchForm.get("searchCl").valueChanges.subscribe(
            s => this.store.dispatch(new fromActions.search.LoadSearchOptionsAction(
                {search: {
                        ...this.searchForm.value as SearchQueryModel,
                        searchCl: s,
                    }, tfOrCl: "cl"}
            )));
        this.searchForm.get("searchTf").valueChanges.subscribe(
            s => {console.log(s);
                this.store.dispatch(new fromActions.search.LoadSearchOptionsAction(
                    {search: {
                            ...this.searchForm.value as SearchQueryModel,
                            searchTf: s,
                        }
                        , tfOrCl: "tf"}
                ));
            });
        this.store.dispatch(new fromActions.search.LoadSearchResultsAction(
            {search: this.searchForm.value, isAdvanced: this.isAdvanced}
        ));
    }

    _clearSearchField() {
        this.searchForm.patchValue(this.nullValue);
    }

    _navigateToSearch() {
        console.log(this.isAdvanced);
        if ((this.searchForm.get("searchInput").value || this.isAdvanced) &&
            this.searchForm.valid) {
            const currentFilter = this.searchForm.value as SearchQueryModel;
            this.store.dispatch(new fromActions.search.LoadSearchResultsAction(
                {search: currentFilter, isAdvanced: this.isAdvanced}
            ));
            if (this.isAdvanced) {
                this.router.navigate(["/search/advanced"], {
                    queryParams: this._getSearchParams(this.isAdvanced)});
            } else {
                this.router.navigate(["/search/simple"], {
                    queryParams: this._getSearchParams(this.isAdvanced)});
            }

        }
    }

    _getResultsInCsv() {
        this.toastr.info("May take some time with long results", "Info");
        this.searchService.getSearchResultsCsv(this.searchForm.value as SearchQueryModel).subscribe(
            (res) => {
                this.saverService.save(res,
                    "search_" + moment().format("YYYY-MM-DD_HH-mm") + ".csv");
            },
            (err) => {
                console.log("err");
                console.log(err.text);
            });
    }

    _checkToDisplay(id: string) {
        const searchBy: string[] = this.searchForm.get("searchByArray").value as string[];
        if (this.isAdvanced) {

            if (searchBy && searchBy.length &&
                searchBy.length > 0) {
                return searchBy.some(s => id === s);
            } else {
                return false;
            }
        } else {
            return this.searchForm.get("searchBy").value === id;
        }

    }

    _addChip(event: MatChipInputEvent, where: TfOrCl): void {
        const input = event.input;
        const value = event.value;

        // Reset the input value
        if (input) {
            input.value = "";
        }
        if ((value || "").trim()) {
            this.searchForm.patchValue(
                where === "tf" ?
                    {
                        searchTf: null, tfList: [
                            ...this.searchForm.value.tfList,
                            value.trim()]
                    } :
                    {
                        searchCl: null, clList: [
                            ...this.searchForm.value.clList,
                            value.trim()]
                    }
            );
        }
    }

    _selectOption(event: MatAutocompleteSelectedEvent, where: TfOrCl): void {
        if (where === "tf") {
            this.tfInput.nativeElement.value = "";
            this.searchForm.patchValue({searchTf: null, tfList: [
                    ...this.searchForm.value.tfList,
                    event.option.value
                ]
            });
        }
        if (where === "cl") {
            this.clInput.nativeElement.value = "";
            this.searchForm.patchValue({searchCl: null, clList: [
                    ...this.searchForm.value.clList,
                event.option.value
            ]});
        }
    }

    _removeChip(chipName: string, where: TfOrCl): void {
        this.searchForm.patchValue(where === "tf" ?
            {tfList: this.searchForm.value.tfList.filter(s => s !== chipName)} :
            {clList: this.searchForm.value.clList.filter(s => s !== chipName)});
    }

    _getFirstOptionValue(value: string[]): string {
        if (!value || value.length === 0) {
            return "";
        } else {
            return this.advancedSearchOptions.filter(s => s.value === value[0])[0].view;
        }
    }

    _getSearchParams(isAdvanced: boolean): Partial<SearchParamsModel> {
        const sF = this.searchForm.value as SearchQueryModel;
        if (!isAdvanced) {
            if (sF && sF.searchBy) {
                if (sF.searchBy !== "id" || sF.searchByArray.indexOf("pos") !== -1) {
                    return {
                        pos: sF.searchInput,
                        chr: sF.chromosome,
                    };
                } else {
                    return {
                        rs: sF.searchInput
                    };
                }
            } else {
                return sF.searchInput ?
                    sF.searchByArray.indexOf("pos") !== -1 ?
                        {pos: sF.searchInput, chr: sF.chromosome}
                        : {rs: sF.searchInput}
                    : {};
            }
        } else {
            if (sF && sF.searchByArray) {
                const result: Partial<SearchParamsModel> = {by: sF.searchByArray.join(",")};
                sF.searchByArray.forEach(s => addToParams(s, sF, result));
                return result;
            } else return {};
        }
    }

    _convertParams(searchParams: Partial<SearchParamsModel>): Partial<SearchQueryModel> {
        if (this.isAdvanced) {
            if (searchParams && searchParams.by) {
                const byArray: SearchByModel[] = searchParams.by.split(",") as SearchByModel[];
                const result: Partial<SearchQueryModel> = {
                    searchByArray: byArray,
                };
                byArray.forEach(s => addToResult(s, searchParams, result));
                return result;
            } else {
                return {};
            }
        } else {
            return searchParams && searchParams.pos ?
                {
                    searchBy: "pos",
                    chromosome: searchParams.chr || "1",
                    searchInput: searchParams.pos
                } :
                {searchBy: "id", searchInput: searchParams.rs};

        }
    }
}

function addToResult(s: SearchByModel, params: Partial<SearchParamsModel>, result: Partial<SearchQueryModel>) {
    switch (s) {
        case "cl":
            result.clList = params.cl ? params.cl.split(",") : [];
            return;
        case "pos":
            result.searchInput = params.pos;
            result.chromosome = params.chr;
            return;
        case "tf":
            result.tfList = params.tf ? params.tf.split(",") : [];
            return;
    }
}
function addToParams(s: SearchByModel, sF: SearchQueryModel, result: Partial<SearchParamsModel>) {
    switch (s) {
        case "cl":
            if (sF && sF.clList.length > 0) result.cl = sF.clList.join(",");
            return;
        case "pos":
            result.pos = sF.searchInput;
            result.chr = sF.chromosome;
            return;
        case "tf":
            if (sF && sF.tfList.length > 0) result.tf = sF.tfList.join(",");
            return;
    }
}

function matchingPattern(searchKey: string,
                         optionKey: string,
                         optionsKey: string,
                         isAdvancedSearch: boolean) {
    return (group: FormGroup): {[key: string]: any} => {
        const search: string = group.controls[searchKey].value || "";
        const option: string = group.controls[optionKey].value;
        const options: string[] = group.controls[optionsKey].value;
        if ((option === "pos" && !isAdvancedSearch)
            || (options && options.indexOf("pos") !== -1 && isAdvancedSearch)) {
            if (!search.match(/\d+:\d+/)) {
                return {
                    wrongPattern: true
                };
            }
            const posArray: string[] = search.split(":");
            if (posArray.length === 2) {
                const [startPos, endPos] = posArray;
                if ((!Number(startPos) && startPos !== "0") || !Number(endPos)) {
                    return {
                        wrongPattern: true
                    };
                }
                if (Number(startPos) > Number(endPos)) {
                    return {
                        greater: true
                    };
                }
            } else {
                return {
                    wrongPattern: true
                };
            }
        }
    };
}
