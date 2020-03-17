import {Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "src/app/store";
import * as fromSelectors from "src/app/store/selector";
import * as fromActions from "src/app/store/action";
import {SearchQueryModel} from "src/app/models/searchQueryModel";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

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
    private input$: Observable<SearchQueryModel>;

    @Output ()
    public searchQuery: EventEmitter<SearchQueryModel>;

    public searchForm: FormGroup;
    separatorKeysCodes: number[] = [ENTER, COMMA];

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<AppState>,
        private router: Router,
        private route: ActivatedRoute,
        private titleService: Title,
    ) { }

    public listOfChrs: string[] = [];
    searchOptions: string[] = ["CTCF", "ANDR"];

    ngOnInit() {
        this.titleService.setTitle(this.route.snapshot.data.title);
        for (let i = 1; i < 22; i++ ) {
            this.listOfChrs.push(String(i));
        }
        this.listOfChrs.push("X");
        this.searchForm = this.formBuilder.group({
            searchInput: "",
            searchBy: "",
            chromosome: "",
            searchByArray: null,
            searchTf: null,
            searchCl: null,
            tfList: null,
            clList: null,
        }, {
                validator: matchingPattern("searchInput",
                    "searchBy", "searchByArray", this.isAdvanced),
            }
        );
        this.input$ = this.store.select(fromSelectors.selectCurrentSearchQuery);
        this.input$.subscribe(s => {
            if (this.searchForm.value !== s) {
                this.searchForm.patchValue(s,
                    // {
                    //     searchInput: s.searchInput,
                    //     searchBy: s.searchByArray.indexOf("pos") !== -1 ? "pos" : s.searchBy,
                    //     chromosome: s.chromosome,
                    //     searchTf: s.searchTf,
                    //     searchCl: s.searchCl,
                    //     searchByArray:
                    //         s.searchBy === "pos" &&
                    //         s.searchByArray.indexOf("pos") === -1 ?
                    //             [...s.searchByArray, "pos"] :
                    //             s.searchByArray,
                    // },
                    {emitEvent: false});
            }
        });
        this.searchForm.valueChanges.subscribe(
            () => this.store.dispatch(new fromActions.search.SetFilterAction(
                this.searchForm.value as SearchQueryModel,
            )));
        }

    _clearSearchField() {
        this.searchForm.patchValue(this.nullValue);
    }

    _navigateToSearch() {
        if ((this.searchForm.get("searchInput").value || this.isAdvanced) &&
            this.searchForm.valid) {
            const currentFilter = this.searchForm.value as SearchQueryModel;
            this.store.dispatch(new fromActions.search.SetFilterAction(currentFilter));
            this.store.dispatch(new fromActions.search.LoadSearchResultsAction(
                {search: currentFilter, isAdvanced: this.isAdvanced}
            ));
            if (!this.router.isActive("/search", false)) {
                this.router.navigate(["/search"]);
            }

        }
    }

    _getResultsInCsv() {
        console.log("Need results)");
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

    _addChip(event: MatChipInputEvent, where: tfOrCl): void {
        const input = event.input;
        const value = event.value;

        // Reset the input value
        if (input) {
            input.value = "";
        }
        this.searchForm.patchValue(
            where === "tf" ?
                {searchTf: null, tfList: [
                    ...this.searchForm.value.tfList,
                    value.trim()]
                } :
                {searchCl: null, clList: [
                        ...this.searchForm.value.clList,
                        value.trim()]
                }
            );
    }

    _selectOption(event: MatAutocompleteSelectedEvent, where: tfOrCl): void {
        if (where === "tf") {
            this.tfInput.nativeElement.value = "";
            this.searchForm.patchValue({searchTf: null, tfList: [
                    ...this.searchForm.value.tfList,
                    event.option.viewValue
                ]
            });
        }
        if (where === "cl") {
            this.clInput.nativeElement.value = "";
            this.searchForm.patchValue({searchCl: null, clList: [
                    ...this.searchForm.value.clList,
                event.option.viewValue
            ]});
        }
    }

    _removeChip(chipName: string, where: tfOrCl): void {
        this.searchForm.patchValue(where === "tf" ?
            {tfList: this.searchForm.value.tfList.filter(s => s !== chipName)} :
            {clList: this.searchForm.value.clList.filter(s => s !== chipName)});
    }
}

function matchingPattern(searchKey: string,
                         optionKey: string,
                         optionsKey: string,
                         isAdvancedSearch: boolean) {
    return (group: FormGroup): {[key: string]: any} => {
        const search: string = group.controls[searchKey].value;
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
                if (!Number(startPos) || !Number(endPos)) {
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
declare type tfOrCl = "tf" | "cl";
