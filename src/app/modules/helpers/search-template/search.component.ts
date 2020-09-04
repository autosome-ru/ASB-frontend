import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild, ViewEncapsulation
} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "src/app/store";
import * as fromSelectors from "src/app/store/selector";
import * as fromActions from "src/app/store/action";
import {SearchHintModel, SearchParamsModel, SearchQueryModel} from "src/app/models/searchQueryModel";
import {SnpSearchModel, TfOrCl} from "src/app/models/data.model";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {FileSaverService} from "ngx-filesaver";
import {SearchService} from "src/app/services/search.service";
import {ToastrService} from "ngx-toastr";
import {concordanceModelExample, phenotypesModelExample, phenotypesToView} from "../../../helpers/constants/constants";
import {debounceTime, map} from "rxjs/operators";
import {checkOneResult, convertFormToParams, isValidPosInterval} from "../../../helpers/helper/check-functions.helper";
import {ReleaseModel} from "src/app/models/releases.model";
import {getTextByStepName} from "src/app/helpers/helper/tour-text.helper";


@Component({
    selector: "asb-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit, OnDestroy {
    @HostBinding("class.asb-search")
    private readonly cssClass = true;

    @ViewChild("clInput") clInput: ElementRef<HTMLInputElement>;
    @ViewChild("autoCl") autocompleteCl: MatAutocomplete;
    @ViewChild("tfInput") tfInput: ElementRef<HTMLInputElement>;
    @ViewChild("autoTf") autocompleteTf: MatAutocomplete;

    @Input()
    public width: "restricted" | "full";

    @Input()
    public isAdvanced: boolean;

    @Input()
    public searchData: SnpSearchModel[];

    @Input()
    public searchDataLoading: boolean;

    @Output()
    private searchPressed = new EventEmitter<SearchQueryModel>();

    @Output()
    private nextStep= new EventEmitter<void>();

    private readonly nullValue: {searchInput: string} = {searchInput: ""};
    private searchParams: SearchParamsModel;

    private subscriptions: Subscription = new Subscription();


    listOfChrs: string[];
    readonly phenToView: { [p: string]: string } = phenotypesToView;
    readonly phenotypes: string[] = Object.keys(phenotypesModelExample);
    readonly concordances: string[] = Object.keys(concordanceModelExample);

    public searchForm: FormGroup;
    public searchOptions$: Observable<{tf: SearchHintModel[], cl: SearchHintModel[]}>;
    public searchOptionsLoading$: Observable<{ tf: boolean, cl: boolean }>;
    public downloadButtonColor: "primary" | null = null;
    public showNearbyControl: FormControl;
    public currentRelease$: Observable<ReleaseModel>;
    public search: (text$: Observable<string>) => Observable<unknown>;




    private static initChromosomes(): string[] {
        const result: string[] = [];
        for (let i = 1; i < 23; i++) {
            result.push("chr" + i);
        }
        result.push("chrX");
        return result;
    }

    private static convertPosToInterval(searchInput: string): string {
        if (searchInput.match(/^\d+$/)) {
            return `${Number(searchInput) > 100 ? Number(searchInput) - 100 : 1}-${Number(searchInput) + 100}`;
        } else {
            const [start, end] = searchInput.split("-");
            return `${Number(start) > 100 ? Number(start) - 100 : 1}-${Number(end) + 100}`;
        }
    }

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<AppState>,
        private router: Router,
        private route: ActivatedRoute,
        private saverService: FileSaverService,
        private searchService: SearchService,
        private toastr: ToastrService,
    ) {}

    ngOnInit() {
        this.listOfChrs = SearchComponent.initChromosomes();
        this.currentRelease$ = this.store.select(fromSelectors.selectCurrentRelease)

        this.showNearbyControl = this.formBuilder.control(100);
        this.search = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(term => console.log(term))
            )

        // Create form and patch it from url params
        this.searchForm = this.formBuilder.group({
            isAdvanced: this.isAdvanced,
            searchInput: "",
            searchBy: "id",
            chromosome: null,
            searchTf: null,
            searchCl: null,
            tfList: [[]],
            clList: [[]],
            ebi: false,
            phewas: false,
            grasp: false,
            finemapping: false,
            clinvar: false,
            QTL: false,
            ...concordanceModelExample
        }, {
                validator: matchingPattern("searchInput",
                    "searchBy", this.isAdvanced),
            }
        );
        // Search options and patching form in simple search
        this.subscriptions.add(
            this.searchForm.get("searchCl").valueChanges.pipe(debounceTime(250)).subscribe(
                s => this.store.dispatch(new fromActions.search.LoadSearchOptionsAction(
                    {search: {
                            ...this.searchForm.value as SearchQueryModel,
                            searchCl: s,
                        }, tfOrCl: "cl"}
                ))
            )
        );
        this.subscriptions.add(
            this.searchForm.get("searchTf").valueChanges.pipe(debounceTime(250)).subscribe(
                s => this.store.dispatch(new fromActions.search.LoadSearchOptionsAction(
                    {search: {
                            ...this.searchForm.value as SearchQueryModel,
                            searchTf: s,
                        }, tfOrCl: "tf"}
                ))
            )
        );
        this.subscriptions.add(
            this.searchForm.get("chromosome").valueChanges.subscribe(
                (s: string) => {
                    if (s === "any chr") {
                        this.searchForm.get("searchInput").disable();
                    } else if (this.searchForm.get("searchInput").disabled) {
                        this.searchForm.get("searchInput").enable();
                    }

                }
            )
        );
        this.subscriptions.add(
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
                                {chromosome: "chr1"});
                        }
                    }
                    if (checkOneResult(this.searchData)) {
                        this.searchForm.patchValue(
                            s === "pos" ?
                                {
                                    searchInput: "" + this.searchData[0].pos,
                                    chromosome: this.searchData[0].chr
                                } :
                                {
                                    searchInput: this.searchData[0].rsId,
                                }
                        );
                    }
                }
            )
        );
        this.subscriptions.add(
            this.route.queryParams.subscribe(
                (s: SearchParamsModel) => {
                    this.searchParams = s;
                    this.searchForm.patchValue(this._convertParamsToForm(this.searchParams));
                    if (!this._isSearchDisabled()) {
                        this.searchPressed.emit(this.searchForm.value);

                    }
                }
            )
        );
        this.searchOptions$ = this.store.select(fromSelectors.selectCurrentSearchOptions);
        this.searchOptionsLoading$ = this.store.select(fromSelectors.selectCurrentSearchOptionsLoading);
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    _clearSearchField() {
        this.searchForm.patchValue(this.nullValue);
    }

    _navigateToSearch() {
        if (!this._isSearchDisabled()) {
            let params: {[a: string]: string} = {
                ...this._convertFormToParams(this.isAdvanced)
            }
            if (!this.router.url.includes('/search')) {
                params = {...params, skip_check: '1'}
            }
            this.subscriptions.add(
                this.currentRelease$.subscribe(r =>
                    this.router.navigate([`/${r.url}/search/` +
                    (this.isAdvanced ? "advanced" : "simple")], {
                        queryParams: params,
                    })
                )
            )
        }
    }

    _getResultsInCsv() {
        this.toastr.info("Please wait, it may take a few seconds.", "Info");
        this.subscriptions.add(
            this.searchService.getSearchResultsCsv(this.searchForm.value as SearchQueryModel).subscribe(
                (res) => {
                    this.saverService.save(res,
                        "AD_ASTRA_search_results.tsv");
                },
                (error) => this.toastr.error(error.message, "Error")
            )
        );
    }

    _initDemo() {
        let search: Partial<SearchQueryModel>;
        if (this.isAdvanced) {
            search = {
                searchInput: "1-50000000",
                chromosome: "chr1",
                clList: ["HEK293 (embryonic kidney)"],
                tfList: ["ANDR_HUMAN", "CTCF_HUMAN"],
                ebi: false,
                grasp: false,
                phewas: false,
                finemapping: false,
                clinvar: false,
                QTL: false,
                ...concordanceModelExample
            };
        } else {
            search = {
                searchBy: 'pos',
                chromosome: 'chr3',
                searchInput: '158644602'
            }
        }
        this.searchForm.patchValue(search);
        this._navigateToSearch();
    }

    _checkToDisplay(id: string): boolean {
        const searchForm = this.searchForm.value as SearchQueryModel;
        if (this.isAdvanced) {
            if (id === "searchNear") {
                return !!searchForm.chromosome &&
                    searchForm.chromosome !== "any chr" &&
                    !this._isSearchDisabled() && !!this.searchForm.get("searchInput").value;
            } else {
                return id !== "id";
            }
        } else {
            if (id === "searchNear") {
                if (searchForm.searchBy === "pos") {
                    return (!!searchForm.chromosome &&
                        searchForm.chromosome !== "any chr" && !this._isSearchDisabled());
                } else {
                    return !this.searchDataLoading && checkOneResult(this.searchData);
                }
            } else {
                return searchForm.searchBy === id;
            }
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
        this.searchForm.patchValue({isAdvanced: isAdvanced});
        return convertFormToParams(this.searchForm.value, this.isAdvanced, this.searchData);
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
                if (searchParams.phe_db) {
                    searchParams.phe_db.split(",").forEach(s => result[s] = true);
                }
                if (searchParams.motif_conc) {
                    searchParams.motif_conc.split(',').forEach(s => result[s] = true)
                }
                return result;
            } else return {};
        } else {
            return searchParams && searchParams.hasOwnProperty("chr") ?
                {
                    searchBy: "pos",
                    chromosome: searchParams.chr,
                    searchInput: searchParams.pos || ""
                } :
                {searchBy: "id", searchInput: searchParams.rs};
        }
    }

    _isSearchDisabled(): boolean {
        const sF = this.searchForm.value as SearchQueryModel;
        return (!this.isAdvanced && !sF.searchInput) ||
            this.searchForm.invalid || (
                this.isAdvanced &&
                sF.tfList.length === 0 &&
                sF.clList.length === 0 &&
                !checkIfCheckpointSelected(sF) &&
                (!sF.chromosome ||
                sF.chromosome === "any chr"));
    }

    _nearbySearch() {
        let patchValue: Partial<SearchQueryModel>;
        if (this.isAdvanced) {
            patchValue = {
                searchInput: SearchComponent.convertPosToInterval(
                    this.searchForm.value.searchInput)
            };
        } else {
            if (this.searchForm.value.searchBy === "id") {
                patchValue = {
                    searchBy: "pos",
                    searchInput: SearchComponent.convertPosToInterval(
                        "" + this.searchData[0].pos),
                    chromosome: this.searchData[0].chr,
                };
            } else {
                patchValue = {
                    searchInput: SearchComponent.convertPosToInterval(
                        this.searchForm.value.searchInput)
                };
            }
        }
        this.searchForm.patchValue(patchValue);
        this._navigateToSearch();
    }

    getTextByStepName(step: string) {
        return getTextByStepName(step)
    }

    nextExampleStep() {
        this.nextStep.emit()
    }

    searchById() {
        if (!this.isAdvanced) {
            this.searchForm.patchValue({searchBy: 'id'})
        }
    }
}

function matchingPattern(searchKey: string,
                         optionKey: string,
                         isAdvancedSearch: boolean) {
    return (group: FormGroup): {[key: string]: any} => {
        const search: string = group.controls[searchKey].value || "";
        const option: string = group.controls[optionKey].value;
        if ((option === "pos" && !isAdvancedSearch)
            || (isAdvancedSearch && search)) {
            if (isValidPosInterval(search)) {
                const [startPos, endPos] = search.split("-");
                if ((Number(startPos) || startPos === "0") && (Number(endPos) || endPos === "0")) {
                    if (Number(startPos) > Number(endPos) || endPos === "0") {
                        return {
                            greater: true
                        };
                    } else {
                        return;
                    }
                }
                return {
                    wrongPattern: true
                };
            } else {
                if (search.match(/^\d*$/)) {
                    return;
                } else {
                    return {
                        wrongPattern: true
                    };
                }
            }

        }
    }
}
function checkIfCheckpointSelected(sF: SearchQueryModel) {
    let result: boolean = false;
    Object.keys(concordanceModelExample).forEach(s => sF[s] ? result = true : null);
    Object.keys(phenotypesModelExample).forEach(s => sF[s] ? result = true : null);
    return result;
}

