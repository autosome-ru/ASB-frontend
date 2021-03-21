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
import {SnpSearchModel, TfOrCl} from "src/app/models/data.model";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {FileSaverService} from "ngx-filesaver";
import {SearchService} from "src/app/services/search.service";
import {ToastrService} from "ngx-toastr";
import {concordanceModelExample, phenotypesModelExample, phenotypesToView} from "../../../helpers/constants/constants";
import {debounceTime} from "rxjs/operators";
import {checkOneResult, convertFormToParams} from "../../../helpers/helper/check-functions.helper";
import {ReleaseModel} from "src/app/models/releases.model";
import {getTextByStepNameAdastra} from "src/app/helpers/text-helpers/tour.adastra.helper";
import {ChromPos, validateGroup} from "../form-fields/form-fields.component";


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


    listOfChrs: string[];
    readonly phenToView: { [p: string]: string } = phenotypesToView;
    readonly phenotypes: string[] = Object.keys(phenotypesModelExample);
    readonly concordances: string[] = Object.keys(concordanceModelExample);

    public searchForm: FormGroup;
    public searchOptions$: Observable<{tf: SearchHintModel[], cl: SearchHintModel[]}>;
    public searchOptionsLoading$: Observable<{ tf: boolean, cl: boolean }>;
    public downloadButtonColor: "primary" | null = null;
    public currentRelease$: Observable<ReleaseModel>;
    public searchGeneOptions$: Observable<GeneModel[]>;
    public searchGeneOptionsLoading$: Observable<boolean>;


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
        this.currentRelease$ = this.store.select(fromSelectors.selectCurrentRelease);

        // Create form and patch it from url params
        this.searchForm = this.formBuilder.group({
            isAdvanced: this.isAdvanced,
            rsId: "",
            chromPos: [new ChromPos("", ""), [validateGroup]],
            searchBy: "id",
            geneId: "",
            eqtlGeneId: "",
            eqtlGeneName: "",
            fdr: '0.05',
            geneName: "",
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
        }
        );

        // Search options and patching form in simple search
        this.subscriptions.add(
            this.searchForm.get("searchCl").valueChanges.pipe(debounceTime(200)).subscribe(
                s => this.store.dispatch(new fromActions.search.LoadSearchOptionsAction(
                    {search: {
                            ...this.searchForm.value as SearchQueryModel,
                            searchCl: s,
                        }, tfOrCl: "cl"}
                ))
            )
        );
        this.subscriptions.add(
            this.searchForm.get('geneName').valueChanges.pipe(debounceTime(200)).subscribe(
                (s: string) => {
                    if (this.searchForm.get('searchBy').value == 'geneName') {
                        this.store.dispatch(
                            new fromActions.search.LoadSearchByGeneNameOptionsAction({name: s, isEqtl: false}))
                    }
                }
            )
        );
        this.subscriptions.add(
            this.searchForm.get('eqtlGeneName').valueChanges.pipe(debounceTime(200)).subscribe(
                (s: string) => {
                    if (this.searchForm.get('searchBy').value == 'eqtlGeneName') {
                        this.store.dispatch(
                            new fromActions.search.LoadSearchByGeneNameOptionsAction({name: s, isEqtl: true}))
                    }
                }
            )
        );
        this.subscriptions.add(
            this.searchForm.get("searchTf").valueChanges.pipe(debounceTime(200)).subscribe(
                s => this.store.dispatch(new fromActions.search.LoadSearchOptionsAction(
                    {search: {
                            ...this.searchForm.value as SearchQueryModel,
                            searchTf: s,
                        }, tfOrCl: "tf"}
                ))
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
                                }
                                this.store.dispatch(
                                    new fromActions.search.LoadSearchByGeneNameOptionsAction(
                                        {name: this.selectedGene.name, isEqtl: true}))
                                break;
                            case "eqtlGeneId":
                                patchValue = {
                                    eqtlGeneId: this.selectedGene.id
                                }
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

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    _clearSearchField(name) {
        this.searchForm.patchValue({[name]: this.nullValue[name]});
    }

    _navigateToSearch() {
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
                chromPos: new ChromPos("1", "1-50000000"),
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
                        return !!this.selectedGene && !this._isSearchDisabled()
                }
            } else {
                return searchForm.searchBy === id || id === '';
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
        this.searchForm.patchValue({isAdvanced});
        return convertFormToParams(this.searchForm.value, this.isAdvanced, this.searchData, this.selectedGene);
    }

    _convertParamsToForm(searchParams: Partial<SearchParamsModel>): Partial<SearchQueryModel> {
        if (this.isAdvanced) {
            if (searchParams) {
                const result: Partial<SearchQueryModel> = searchParams.fdr ? {fdr: searchParams.fdr} : {};
                result.chromPos = new ChromPos(searchParams.chr || "", searchParams.pos || "");
                result.clList = searchParams.cl ? searchParams.cl.split("@") : [];
                result.tfList = searchParams.tf ? searchParams.tf.split(",") : [];
                result.fdr = searchParams.fdr ? searchParams.fdr : defaultFdr
                if (searchParams.phe_db) {
                    searchParams.phe_db.split(",").forEach(s => result[s] = true);
                }
                if (searchParams.motif_conc) {
                    searchParams.motif_conc.split(",").forEach(s => result[s] = true);
                }
                return result;
            } else { return {}; }
        } else {
            if (searchParams) {
                if (searchParams.hasOwnProperty("rs")) {
                    return {
                        searchBy: "id",
                        geneId: "",
                        geneName: "",
                        fdr:  searchParams.fdr ? searchParams.fdr : defaultFdr,
                        rsId: searchParams.rs,
                        chromPos: new ChromPos(searchParams.chr, searchParams.pos)
                    };
                }
                if (searchParams.hasOwnProperty("chr")) {
                    return {
                        searchBy: "pos",
                        geneId: "",
                        geneName: "",
                        fdr:  searchParams.fdr ? searchParams.fdr : defaultFdr,
                        rsId: "",
                        chromPos: new ChromPos(searchParams.chr, searchParams.pos)
                    };
                }
                if (searchParams.hasOwnProperty("g_id")) {
                    return {
                        searchBy: "geneId",
                        fdr:  searchParams.fdr ? searchParams.fdr : defaultFdr,
                        geneId: searchParams.g_id
                    };
                }
                if (searchParams.hasOwnProperty("eqtl_g_id")) {
                    return {
                        searchBy: "eqtlGeneId",
                        fdr:  searchParams.fdr ? searchParams.fdr : defaultFdr,
                        eqtlGeneId: searchParams.eqtl_g_id
                    };
                }
                if (searchParams.hasOwnProperty("eqtl_g_name")) {
                    return {
                        searchBy: "eqtlGeneName",
                        fdr:  searchParams.fdr ? searchParams.fdr : defaultFdr,
                        eqtlGeneName: searchParams.eqtl_g_name
                    };
                }
                if (searchParams.hasOwnProperty("g_name")) {
                    return {
                        searchBy: "geneName",
                        fdr:  searchParams.fdr ? searchParams.fdr : defaultFdr,
                        geneName: searchParams.g_name
                    };
                } else {
                    return {}
                }
            } else {
                return {
                    searchBy: "id",
                    fdr: defaultFdr,
                    geneId: "",
                    geneName: ""
                };
            }
        }
    }

    _isSearchDisabled(): boolean {
        const sF = this.searchForm.value as SearchQueryModel;
        if (!this.isAdvanced) {
            if (sF.searchBy == "id") {
                return !sF.rsId;
            }
            if (sF.searchBy == "geneId") {
                return !sF.geneId;
            }
            if (sF.searchBy == "geneName") {
                return !sF.geneName;
            }
            if (sF.searchBy == "eqtlGeneName") {
                return !sF.eqtlGeneName;
            }
            if (sF.searchBy == "eqtlGeneId") {
                return !sF.eqtlGeneId;
            }
        }
        if (!this.searchForm.invalid) {
            if (this.isAdvanced) {
                return !sF.chromPos.chr && sF.tfList.length === 0 &&
                    sF.clList.length === 0 && !checkIfCheckpointSelected(sF);
            } else {
                if (sF.searchBy == "pos") {
                    return !sF.chromPos.chr;
                }
            }
        }
        return true;
    }

    _nearbySearch() {
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
                    }
                    break;
            }
        }
        this.searchForm.patchValue(patchValue);
        this._navigateToSearch();
    }

    getTextByStepName(step: string, component?: string) {
        return getTextByStepNameAdastra(step, component);
    }

    nextExampleStep() {
        this.nextStep.emit();
    }

    setSearchBy(id: 'gene' | 'pos' | 'id' | 'eqtlGene') {
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

function checkIfCheckpointSelected(sF: SearchQueryModel) {
    let result = false;
    Object.keys(concordanceModelExample).forEach(s => sF[s] ? result = true : null);
    Object.keys(phenotypesModelExample).forEach(s => sF[s] ? result = true : null);
    return result;
}

const defaultFdr: string = '0.05'
