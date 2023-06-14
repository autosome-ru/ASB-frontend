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
import {FormBuilder, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "src/app/store/indexes";
import * as fromSelectors from "src/app/store/selector/adastra";
import * as fromActions from "src/app/store/action/adastra";
import {
    GeneModel, SearchByModel,
    SearchHintModel,
    SearchParamsModel,
    SearchQueryModel
} from "src/app/models/search-query.model";
import {SnpSearchModel, AggType} from "src/app/models/data.model";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {FileSaverService} from "ngx-filesaver";
import {SearchService} from "src/app/services/search.service";
import {ToastrService} from "ngx-toastr";
import {
    concordanceModelExample,
    esOptions, fdrOptions,
    phenotypesModelExample,
    phenotypesToView
} from "../../../helpers/constants/constants";
import {debounceTime} from "rxjs/operators";
import {checkOneResult, convertFormToParams} from "../../../helpers/helper/check-functions.helper";
import {ReleaseModel} from "src/app/models/releases.model";
import {getTextByStepNameAdastra} from "src/app/helpers/text-helpers/tour.adastra.helper";
import {ChromPos, validateGroup} from "../form-fields/form-fields.component";
import {ReleasesService} from "../../../services/releases.service";


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

    @ViewChild("dnaseInput") dnaseInput: ElementRef<HTMLInputElement>;
    @ViewChild("autoDnase") autocompleteDnase: MatAutocomplete;

    @ViewChild("atacInput") atacInput: ElementRef<HTMLInputElement>;
    @ViewChild("autoAtac") autocompleteAtac: MatAutocomplete;

    @ViewChild("faireInput") faireInput: ElementRef<HTMLInputElement>;
    @ViewChild("autoFaire") autocompleteFaire: MatAutocomplete;

    @Input()
    public width: "restricted" | "full";

    @Input()
    private selectedGene: GeneModel;

    @Input()
    public isAdvanced: boolean;

    @Input()
    public searchData: SnpSearchModel[];

    @Input()
    public searchDataLoading: boolean;

    @Output()
    private searchPressed = new EventEmitter<SearchQueryModel>();

    @Output()
    private nextStep = new EventEmitter<void>();

    private readonly nullValue = {
        rsId: "",
        geneId: "",
        geneName: "",
        eqtlGeneId: "",
        eqtlGeneName: "",
        chromPos: new ChromPos("", "")
    };
    private searchParams: SearchParamsModel;

    private subscriptions: Subscription = new Subscription();

    readonly phenToView: { [p: string]: string } = phenotypesToView;
    readonly phenotypes: string[] = Object.keys(phenotypesModelExample);

    public searchForm: FormGroup;
    public searchOptions$: Observable<{atac: SearchHintModel[],
        dnase: SearchHintModel[], faire: SearchHintModel[]}>;
    public searchOptionsLoading$: Observable<{ atac: boolean,
        dnase: boolean, faire: boolean }>;
    public currentRelease$: Observable<ReleaseModel>;
    public searchGeneOptions$: Observable<GeneModel[]>;
    public searchGeneOptionsLoading$: Observable<boolean>;
    public esOptions: string[] = esOptions;
    public fdrOptions: string[] = fdrOptions;
    private defaultParams: {fdr: string, es: string};


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
        private releaseService: ReleasesService
    ) {}

    ngOnInit(): void {
        this.currentRelease$ = this.store.select(fromSelectors.selectCurrentRelease);
        const chosenRelease = this.releaseService.getReleaseFromFullPath();
        this.defaultParams = {fdr: chosenRelease.defaultFdrThreshold, es: '0'};
        // Create form and patch it from url params
        this.searchForm = this.formBuilder.group({
            isAdvanced: this.isAdvanced,
            rsId: "",
            chromPos: [new ChromPos("", ""), [validateGroup]],
            searchBy: "id",
            geneId: "",
            eqtlGeneId: "",
            eqtlGeneName: "",
            es: this.defaultParams.es,
            fdr: this.defaultParams.fdr,
            geneName: "",
            searchAtac: null,
            searchFaire: null,
            searchDnase: null,
            atacList: [[]],
            faireList: [[]],
            dnaseList: [[]],
            ebi: false,
            phewas: false,
            grasp: false,
            finemapping: false,
            clinvar: false,
            qtl: false,
            ...concordanceModelExample
        }
        );

        // Search options and patching form in simple search
        this.subscriptions.add(
            this.searchForm.get("searchAtac").valueChanges.pipe(debounceTime(200)).subscribe(
                s => this.store.dispatch(new fromActions.search.LoadSearchOptionsAction(
                    {search: {
                            ...this.searchForm.value as SearchQueryModel,
                            searchAtac: s,
                        }, aggType: "atac"}
                ))
            )
        );
        this.subscriptions.add(
            this.searchForm.get("searchDnase").valueChanges.pipe(debounceTime(200)).subscribe(
                s => {this.store.dispatch(new fromActions.search.LoadSearchOptionsAction(
                    {search: {
                            ...this.searchForm.value as SearchQueryModel,
                            searchDnase: s,
                        }, aggType: "dnase"}
                ));
                }

            )
        );
        this.subscriptions.add(
            this.searchForm.get("searchFaire").valueChanges.pipe(debounceTime(200)).subscribe(
                s => {this.store.dispatch(new fromActions.search.LoadSearchOptionsAction(
                    {search: {
                            ...this.searchForm.value as SearchQueryModel,
                            searchFaire: s,
                        }, aggType: "faire"}
                ));
                }

            )
        );
        this.subscriptions.add(
            this.searchForm.get('geneName').valueChanges.pipe(debounceTime(200)).subscribe(
                (s: string) => {
                    if (this.searchForm.get('searchBy').value === 'geneName') {
                        this.store.dispatch(
                            new fromActions.search.LoadSearchByGeneNameOptionsAction({name: s, isEqtl: false}))
                    }
                }
            )
        );
        this.subscriptions.add(
            this.searchForm.get('eqtlGeneName').valueChanges.pipe(debounceTime(200)).subscribe(
                (s: string) => {
                    if (this.searchForm.get('searchBy').value === 'eqtlGeneName') {
                        this.store.dispatch(
                            new fromActions.search.LoadSearchByGeneNameOptionsAction({name: s, isEqtl: true}))
                    }
                }
            )
        );
        this.subscriptions.add(
            this.searchForm.get("searchBy").valueChanges.subscribe(
                (s: SearchByModel) => {
                    let patchValue: Partial<SearchQueryModel> = {};
                    if (this.searchForm.invalid) {
                        patchValue = {
                            chromPos: new ChromPos('', '')
                        }
                    }
                    if (checkOneResult(this.searchData)) {
                        switch (s) {
                            case "pos":
                               patchValue = {
                                   chromPos: new ChromPos(this.searchData[0].chr.slice(3), "" + this.searchData[0].pos)
                               };
                               break;
                            case "id":
                                patchValue = {
                                    rsId: this.searchData[0].rsId,
                                };
                                break;
                        }
                    }
                    if (this.selectedGene && this.selectedGene.chr) {
                        switch (s) {
                            case "pos":
                                patchValue = {
                                    chromPos: new ChromPos(
                                        this.selectedGene.chr.slice(3),
                                        `${Math.max(this.selectedGene.startPos - 1000, 1)}-${this.selectedGene.endPos}`
                                    )
                                }
                                break;
                            case "geneId":
                                patchValue = {
                                    geneId: this.selectedGene.id
                                }
                                break;
                            case "geneName":
                                patchValue = {
                                    geneName: this.selectedGene.name
                                }
                                this.store.dispatch(
                                    new fromActions.search.LoadSearchByGeneNameOptionsAction(
                                        {name: this.selectedGene.name, isEqtl: false}))
                                break;
                            case "eqtlGeneName":
                                patchValue = {
                                    eqtlGeneName: this.selectedGene.name
                                };
                                this.store.dispatch(
                                    new fromActions.search.LoadSearchByGeneNameOptionsAction(
                                        {name: this.selectedGene.name, isEqtl: true}))
                                break;
                            case "eqtlGeneId":
                                patchValue = {
                                    eqtlGeneId: this.selectedGene.id
                                };
                                break;
                        }
                    }
                    this.searchForm.patchValue(patchValue);
                }
            )
        );
        this.subscriptions.add(
            this.route.queryParams.subscribe(
                (s: SearchParamsModel) => {
                    this.searchParams = s;
                    this.searchForm.patchValue(this._convertParamsToForm(s));
                    if (!this._isSearchDisabled()) {
                        this.searchPressed.emit(this.searchForm.value);

                    }
                }
            )
        );
        this.searchGeneOptions$ = this.store.select(
            fromSelectors.selectCurrentSearchByGeneNameOptions)
        this.searchGeneOptionsLoading$ = this.store.select(
            fromSelectors.selectCurrentSearchByGeneNameOptionsLoading)
        this.searchOptions$ = this.store.select(fromSelectors.selectCurrentSearchOptions);
        this.searchOptionsLoading$ = this.store.select(fromSelectors.selectCurrentSearchOptionsLoading);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    _clearSearchField(name): void {
        this.searchForm.patchValue({[name]: this.nullValue[name]});
    }

    _navigateToSearch(): void {
        if (!this._isSearchDisabled()) {
            let params: {[a: string]: string} = {
                ...this._convertFormToParams(this.isAdvanced)
            };
            if (!this.router.url.includes("/search")) {
                params = {...params, skip_check: "1"};
            }
            this.subscriptions.add(
                this.currentRelease$.subscribe(r =>
                    this.router.navigate([`/${r.url}/search/` +
                    (this.isAdvanced ? "advanced" : "simple")], {
                        queryParams: params,
                    })
                )
            );
        }
    }

    _getResultsInCsv(): void {
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

    _initDemo(): void {
        let search: Partial<SearchQueryModel>;
        if (this.isAdvanced) {
            search = {
                chromPos: new ChromPos("1", "1-50000000"),
                atacList: [],
                dnaseList: ["K562 (myelogenous leukemia)"],
                faireList: [],
                ebi: false,
                grasp: false,
                phewas: false,
                finemapping: false,
                clinvar: false,
                qtl: false,
                es: '0',
                ...concordanceModelExample
            };
        } else {
            search = {
                searchBy: "pos",
                chromPos: new ChromPos("15", "67150258")
            };
        }
        this.searchForm.patchValue(search);
        this._navigateToSearch();
    }

    _checkToDisplay(id: string): boolean {
        const searchForm = this.searchForm.value as SearchQueryModel;
        if (this.isAdvanced) {
            if (id === "searchNear" || id === "geneName" || id === "geneId"
                || id === "eqtlGeneName" || id === "eqtlGeneId") {
                return false;
            } else {
                return id !== "id";
            }
        } else {
            if (id === "searchNear") {
                switch (searchForm.searchBy) {
                    case "pos":
                        return (!this._isSearchDisabled());
                    case "id":
                        return !this.searchDataLoading && checkOneResult(this.searchData);
                    default:
                        return !!this.selectedGene && !this._isSearchDisabled();
                }
            } else {
                return searchForm.searchBy === id || id === '';
            }
        }

    }

    _addChip(event: MatChipInputEvent, where: AggType): void {
        const input = event.input;
        const value = event.value;

        // Reset the input value
        if (input) {
            input.value = "";
        }
        if ((value || "").trim()) {
            let val;
            switch (where) {
                case "atac":
                    val = {
                        searchAtac: null, atacList: [
                            ...this.searchForm.value.atacList,
                            value.trim()]
                    };
                    break;
                case 'dnase':
                    val = {
                        searchDnase: null, dnaseList: [
                            ...this.searchForm.value.dnaseList,
                            value.trim()]
                    };
                    break;
                case "faire":
                    val = {
                        searchFaire: null,
                        faireList: [
                            ...this.searchForm.value.faireList,
                            value.trim()]
                    };
                    break;
            }
            this.searchForm.patchValue(val);
        }
    }

    _selectOption(event: MatAutocompleteSelectedEvent, where: AggType): void {
        if (where === "atac") {
            this.atacInput.nativeElement.value = "";
            this.searchForm.patchValue({searchAtac: null, atacList: [
                    ...this.searchForm.value.atacList,
                    event.option.value
                ]
            });
        }
        if (where === "dnase") {
            this.dnaseInput.nativeElement.value = "";
            this.searchForm.patchValue({searchDnase: null, dnaseList: [
                    ...this.searchForm.value.dnaseList,
                event.option.value
            ]});
        }
        if (where === "faire") {
            this.faireInput.nativeElement.value = "";
            this.searchForm.patchValue({searchFaire: null, faireList: [
                    ...this.searchForm.value.faireList,
                    event.option.value
                ]});
        }
    }

    _removeChip(chipName: string, where: AggType): void {
        let patchValue;
        switch (where) {
            case "atac": {
                patchValue = {atacList: this.searchForm.value.atacList.filter(s => s !== chipName)};
                break;
            }
            case "dnase": {
                patchValue = {dnaseList: this.searchForm.value.dnaseList.filter(s => s !== chipName)};
                break;
            }
            case "faire": {
                patchValue = {faireList: this.searchForm.value.faireList.filter(s => s !== chipName)};
                break;
            }
        }
        this.searchForm.patchValue(patchValue);
    }

    _convertFormToParams(isAdvanced: boolean): Partial<SearchParamsModel> {
        this.searchForm.patchValue({isAdvanced});
        return convertFormToParams(this.searchForm.value, this.isAdvanced, this.searchData, this.selectedGene);
    }

    _convertParamsToForm(searchParams: Partial<SearchParamsModel>): Partial<SearchQueryModel> {
        let result: Partial<SearchQueryModel> = {
            fdr: searchParams.fdr ? searchParams.fdr : this.defaultParams.fdr,
            es: searchParams.es ? searchParams.es : this.defaultParams.es
        };
        if (searchParams) {
            if (this.isAdvanced) {
                result.chromPos = new ChromPos(searchParams.chr || "", searchParams.pos || "");
                result.atacList = searchParams.atac ? searchParams.atac.split("@") : [];
                result.dnaseList = searchParams.dnase ? searchParams.dnase.split("@") : [];
                result.faireList = searchParams.faire ? searchParams.faire.split("@") : [];
                if (searchParams.phe_db) {
                    searchParams.phe_db.split(",").forEach(s => result[s] = true);
                }
                return result;
            } else {
                if (searchParams.hasOwnProperty("rs")) {
                    result = {
                        ...result,
                        searchBy: "id",
                        geneId: "",
                        geneName: "",
                        rsId: searchParams.rs,
                        chromPos: new ChromPos(searchParams.chr, searchParams.pos)
                    };
                }
                if (searchParams.hasOwnProperty("chr")) {
                    result = {
                        ...result,
                        searchBy: "pos",
                        geneId: "",
                        geneName: "",
                        rsId: "",
                        chromPos: new ChromPos(searchParams.chr, searchParams.pos)
                    };
                }
                if (searchParams.hasOwnProperty("g_id")) {
                    result = {
                        ...result,
                        searchBy: "geneId",
                        geneId: searchParams.g_id
                    };
                }
                if (searchParams.hasOwnProperty("eqtl_g_id")) {
                    result = {
                        ...result,
                        searchBy: "eqtlGeneId",
                        eqtlGeneId: searchParams.eqtl_g_id
                    };
                }
                if (searchParams.hasOwnProperty("eqtl_g_name")) {
                    result = {
                        ...result,
                        searchBy: "eqtlGeneName",
                        eqtlGeneName: searchParams.eqtl_g_name
                    };
                }
                if (searchParams.hasOwnProperty("g_name")) {
                    result = {
                        ...result,
                        searchBy: "geneName",
                        geneName: searchParams.g_name
                    };
                }
            }
        }
        return result
    }

    _isSearchDisabled(): boolean {
        const sF = this.searchForm.value as SearchQueryModel;
        if (!this.isAdvanced) {
            if (sF.searchBy === "id") {
                return !sF.rsId;
            }
            if (sF.searchBy === "geneId") {
                return !sF.geneId;
            }
            if (sF.searchBy === "geneName") {
                return !sF.geneName;
            }
            if (sF.searchBy === "eqtlGeneName") {
                return !sF.eqtlGeneName;
            }
            if (sF.searchBy === "eqtlGeneId") {
                return !sF.eqtlGeneId;
            }
        }
        if (!this.searchForm.invalid) {
            if (this.isAdvanced) {
                return !sF.chromPos.chr
                    && (sF.dnaseList.length + sF.faireList.length + sF.atacList.length) === 0
                    && !checkIfCheckpointSelected(sF);
            } else {
                if (sF.searchBy === "pos") {
                    return !sF.chromPos.chr;
                }
            }
        }
        return true;
    }

    _nearbySearch(): void {
        let patchValue: Partial<SearchQueryModel>;
        if (this.isAdvanced) {
            patchValue = {
                chromPos: new ChromPos(this.searchForm.value.chromPos.chr, SearchComponent.convertPosToInterval(
                    this.searchForm.value.chromPos.pos))
            };
        } else {
            switch (this.searchForm.value.searchBy as SearchByModel) {
                case 'id':
                    patchValue = {
                        searchBy: "pos",
                        chromPos: new ChromPos(this.searchData[0].chr.slice(3),
                            SearchComponent.convertPosToInterval(
                                "" + this.searchData[0].pos))
                    };
                    break;
                case 'pos':
                    patchValue = {
                        chromPos: new ChromPos(this.searchForm.value.chromPos.chr, SearchComponent.convertPosToInterval(
                            this.searchForm.value.chromPos.pos))
                    };
                    break;
                default:
                    patchValue = {
                        searchBy: "pos",
                        chromPos: new ChromPos(this.selectedGene.chr.slice(3), SearchComponent.convertPosToInterval(
                            `${this.selectedGene.startPos}-${this.selectedGene.endPos}`))
                    };
                    break;
            }
        }
        this.searchForm.patchValue(patchValue);
        this._navigateToSearch();
    }

    getTextByStepName(step: string, component?: string) {
        return getTextByStepNameAdastra(step, component);
    }

    nextExampleStep(): void {
        this.nextStep.emit();
    }

    setSearchBy(id: 'gene' | 'pos' | 'id' | 'eqtlGene'): void {
        switch (id) {
            case "id":
                if (!this.isAdvanced) {
                    this.searchForm.patchValue({searchBy: "id"});
                }
                break;
            case "pos":
                this.searchForm.patchValue({searchBy: 'pos', });
                break;
            case "gene":
                this.searchForm.patchValue({searchBy: 'geneName'})
                break;
            case "eqtlGene":
                this.searchForm.patchValue({searchBy: 'eqtlGeneName'})
                break;
        }
    }

    getValidationMessages(s: string): string {
        switch (s) {
            case "noChr":
                return "*No chromosome provided";
            case "badChr":
                return "*Invalid chromosome";
            case "greater":
                return "*end must be > start";
            case "wrongPos":
                return "*must be from-to";
            default:
                return "";
        }
    }

}

function checkIfCheckpointSelected(sF: SearchQueryModel): boolean {
    let result = false;
    Object.keys(concordanceModelExample).forEach(s => sF[s] ? result = true : null);
    Object.keys(phenotypesModelExample).forEach(s => sF[s] ? result = true : null);
    return result;
}
