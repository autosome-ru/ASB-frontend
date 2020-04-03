import {Component, ElementRef, HostBinding, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "src/app/store";
import * as fromSelectors from "src/app/store/selector";
import * as fromActions from "src/app/store/action";
import {
    SearchHintModel,
    SearchParamsModel,
    SearchQueryModel,
    SearchResultsModel
} from "src/app/models/searchQueryModel";
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
export class SearchComponent implements OnInit, OnChanges {

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

    @Input()
    public searchData: SearchResultsModel;

    @Input()
    public searchDataLoading: boolean;

    public searchForm: FormGroup;

    separatorKeysCodes: number[] = [ENTER, COMMA];

    private searchParams: SearchParamsModel;

    listOfChrs: string[];
    public searchOptions$: Observable<{tf: SearchHintModel[], cl: SearchHintModel[]}>;
    public searchOptionsLoading$: Observable<{ tf: boolean, cl: boolean }>;
    public downloadButtonColor: "primary" | null = null;
    public showNearbyControl: FormControl;

    private static initChromosomes(): string[] {
        const result: string[] = ["any chr"];
        for (let i = 1; i < 22; i++) {
            result.push("chr" + i);
        }
        result.push("chrX");
        return result;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["searchData"] &&
            this.isAdvanced &&
            this.searchData &&
            this.searchData.total &&
            this.searchData.total !== this.searchData.results.length) {
                this.downloadButtonColor = "primary";
                setTimeout(() => {
                    this.downloadButtonColor = null;
            }, 5000);
        }
    }


    ngOnInit() {
        // Set title and meta
        this.titleService.setTitle(this.route.snapshot.data.title);

        this.listOfChrs = SearchComponent.initChromosomes();

        this.showNearbyControl = this.formBuilder.control(100);

        // Create form and patch it from url params
        this.searchForm = this.formBuilder.group({
            searchInput: "",
            searchBy: "id",
            chromosome: null,
            searchTf: null,
            searchCl: null,
            tfList: [[]],
            clList: [[]],
        }, {
                validator: matchingPattern("searchInput",
                    "searchBy", this.isAdvanced),
            }
        );
        // Search options and patching form in simple search
        this.searchForm.get("searchCl").valueChanges.subscribe(
            s => this.store.dispatch(new fromActions.search.LoadSearchOptionsAction(
                {search: {
                        ...this.searchForm.value as SearchQueryModel,
                        searchCl: s,
                    }, tfOrCl: "cl"}
            )));
        this.searchForm.get("searchTf").valueChanges.subscribe(
            s => this.store.dispatch(new fromActions.search.LoadSearchOptionsAction(
                {search: {
                        ...this.searchForm.value as SearchQueryModel,
                        searchTf: s,
                    }, tfOrCl: "tf"}
            )));
        this.searchForm.get("chromosome").valueChanges.subscribe(
            (s: string) => {
                if (s === "any chr") {
                    this.searchForm.get("searchInput").disable();
                } else if (this.searchForm.get("searchInput").disabled) {
                    this.searchForm.get("searchInput").enable();
                }

            }
        );

        this.searchForm.get("searchBy").valueChanges.subscribe(
            (s: "id" | "pos") => {
                if (this.searchForm.get("chromosome").value) {
                    if (s === "id") {
                        this.searchForm.patchValue(
                            {chromosome: null});
                    }
                } else {
                    if ( s === "pos") {
                        this.searchForm.patchValue(
                            {chromosome: "any chr"});
                    }
                }
                if (checkOneResult(this.searchData)) {
                    this.searchForm.patchValue(
                        s === "pos" ?
                            {
                                searchInput: "" + this.searchData.results[0].pos,
                                chromosome: this.searchData.results[0].chr
                            } :
                            {
                                searchInput: this.searchData.results[0].rsId,
                            }
                    );
                }
            });
        this.route.queryParams.subscribe(
            (s: SearchParamsModel) => {
                this.searchParams = s;
                this.searchForm.patchValue(this._convertParamsToForm(this.searchParams));
                if (!this._isSearchDisabled()) {
                    this.store.dispatch(new fromActions.search.LoadSearchResultsAction(
                        {search: this.searchForm.value, isAdvanced: this.isAdvanced}
                    ));
                }
            }
        );
        this.searchOptions$ = this.store.select(fromSelectors.selectCurrentSearchOptions);
        this.searchOptionsLoading$ = this.store.select(fromSelectors.selectCurrentSearchOptionsLoading);
    }

    _clearSearchField() {
        this.searchForm.patchValue(this.nullValue);
    }

    _navigateToSearch() {
        if (!this._isSearchDisabled()) {
            this.router.navigate(["/search/" +
            (this.isAdvanced ? "advanced" : "simple")], {
                queryParams: this._convertFormToParams(this.isAdvanced)});
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

    _initDemo() {
        const search: Partial<SearchQueryModel> = {};
        if (this.isAdvanced) {
            search.searchInput = "1-50000000";
            search.chromosome = "chr1";
            search.clList = ["HEK293 (embryonic kidney)"];
            search.tfList = ["ANDR_HUMAN", "CTCF_HUMAN"];
        } else {
            search.searchBy = "id";
            search.searchInput = "rs11260841";
        }
        this.searchForm.patchValue(search);
        this._navigateToSearch();
    }

    _checkToDisplay(id: string) {
        if (this.isAdvanced) {
            return id !== "id";
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

    _convertFormToParams(isAdvanced: boolean): Partial<SearchParamsModel> {
        const form = this.searchForm.value;
        if (!isAdvanced) {
            if (form && form.searchBy) {
                if (form.searchBy === "pos" || this.isAdvanced !== isAdvanced) {
                    if (form.searchInput) {
                        return {
                            pos: form.searchInput,
                            chr: form.chromosome,
                        };
                    } else return {};

                } else {
                    return form.searchInput ? {rs: form.searchInput} : {};
                }

            } else {
                return form.searchInput ? {pos: form.searchInput, chr: form.chromosome} : {};
            }

        } else {
            if (form) {
                const result: Partial<SearchParamsModel> = {};
                if (form && form.clList.length > 0) result.cl = form.clList.join(",");
                if (form.searchInput && form.searchBy === "id") {
                    if (checkOneResult(this.searchData) && !this.isAdvanced) {
                        result.pos = "" + this.searchData.results[0].pos;
                        result.chr = this.searchData.results[0].chr;
                    } else {
                        result.pos = form.searchInput;
                        result.chr = form.chromosome;
                    }
                } else if (form.chromosome && form.chromosome !== "any chr") {
                    result.chr = form.chromosome;
                }
                if (form && form.tfList.length > 0) result.tf = form.tfList.join(",");
                return result;
            } else return {};
        }
    }

    _convertParamsToForm(searchParams: Partial<SearchParamsModel>): Partial<SearchQueryModel> {
        if (this.isAdvanced) {
            if (searchParams) {
                const result: Partial<SearchQueryModel> = {};
                if (searchParams.pos) {
                    result.searchInput = searchParams.pos;
                    result.chromosome = searchParams.chr;
                } else if (searchParams.chr) {
                    result.chromosome = searchParams.chr;
                } else {
                    result.chromosome = "any chr";
                }
                result.clList = searchParams.cl ? searchParams.cl.split(",") : [];
                result.tfList = searchParams.tf ? searchParams.tf.split(",") : [];
                return result;
            } else return {};
        } else {
            return searchParams && searchParams.hasOwnProperty("pos") ?
                {
                    searchBy: "pos",
                    chromosome: searchParams.chr,
                    searchInput: searchParams.pos
                } :
                {searchBy: "id", searchInput: searchParams.rs};
        }
    }

    _isSearchDisabled(): boolean {
        const sF = this.searchForm.value as SearchQueryModel;
        return (!sF.searchInput && !this.isAdvanced) ||
            this.searchForm.invalid || (
                this.isAdvanced &&
                sF.tfList.length === 0 &&
                sF.clList.length === 0 &&
                (!this.searchForm.get("chromosome").value ||
                this.searchForm.get("chromosome").value === "any chr"));
    }
}

function checkOneResult(searchData: SearchResultsModel): boolean {
    return !!(searchData && searchData.results &&
        searchData.results.length > 0 && searchData.results.length < 4
        && searchData.results.reduce((a, b) =>
                a.pos === b.pos && a.chr === b.chr ?
                    b : {chr: "chr0", pos: 0}, searchData.results[0]).pos);
}

function matchingPattern(searchKey: string,
                         optionKey: string,
                         isAdvancedSearch: boolean) {
    return (group: FormGroup): {[key: string]: any} => {
        const search: string = group.controls[searchKey].value || "";
        const option: string = group.controls[optionKey].value;
        if ((option === "pos" && !isAdvancedSearch)
            || (isAdvancedSearch && search)) {
            if (search.match(/^\d+-\d+$/)) {
                const posArray: string[] = search.split("-");
                if (posArray.length === 2) {
                    const [startPos, endPos] = posArray;
                    if ((Number(startPos) || startPos === "0") && Number(endPos)) {
                        if (Number(startPos) > Number(endPos)) {
                            return {
                                greater: true
                            };
                        }
                        return;
                    }
                }
            }
            if (search.match(/^\d*$/)) {
                return;
            }
            return {
                wrongPattern: true
            };
        }
    };
}
