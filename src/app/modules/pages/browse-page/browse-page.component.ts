import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "src/app/store/reducer/adastra";
import * as fromSelectors from "src/app/store/selector/adastra";
import * as fromActions from "src/app/store/action/adastra";
import {Observable, Subscription} from "rxjs";
import {ClInfoModel, TfInfoModel, TfOrCl} from "../../../models/data.model";
import {
    AsbServerSideFilterModel,
    AsbServerSideModel,
    AsbTableColumnModel,
    AsbTableDisplayedColumns
} from "../../../models/table.model";
import {MatButtonToggleChange} from "@angular/material/button-toggle";
import {SeoModel} from "src/app/models/seo.model";
import {SeoService} from "src/app/services/seo.servise";
import {AsbServerTableComponent} from "../../shared/table-template/server-side/table-server.component";
import {initialServerParams} from "src/app/helpers/constants/constants";
import {getPaginatorOptions} from "src/app/helpers/helper/check-functions.helper";
import {debounceTime, map} from "rxjs/operators";
import {ReleasesService} from "../../../services/releases.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {recentRelease} from "../../../helpers/constants/releases";


@Component({
    selector: "asb-browse-tf",
    templateUrl: "./browse-page.component.html",
    styleUrls: ["./browse-page.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class BrowsePageComponent implements OnInit, OnDestroy {
    @ViewChild("tableTfView", {static: true})
    public tfTableView: AsbServerTableComponent<TfInfoModel>;

    @ViewChild("tableClView", {static: true})
    public clTableView: AsbServerTableComponent<ClInfoModel>;

    @ViewChild("cellTypeViewTemplate", {static: true})
    public cellTypeViewTemplate: TemplateRef<{value: string}>;

    @ViewChild("uniprotViewTemplate", {static: true})
    public uniprotViewTemplate: TemplateRef<{value: string}>;

    public browseTfInfo$: Observable<{results: TfInfoModel[], total: number}>;
    public browseTfInfoLoading$: Observable<boolean>;


    public browseClInfo$: Observable<{results: ClInfoModel[], total: number}>;
    public browseClInfoLoading$: Observable<boolean>;

    public clDisplayedColumns: AsbTableDisplayedColumns<ClInfoModel> = [
        "name",
        "clId",
        "experimentsCount",
        "aggregatedSnpsCount",
    ];
    public clColumnModel: AsbTableColumnModel<ClInfoModel>;
    public tfDisplayedColumns: AsbTableDisplayedColumns<TfInfoModel> = [
        "name",
        "geneName",
        "uniprotAc",
        "experimentsCount",
        "aggregatedSnpsCount",
    ];

    public tfColumnModel: AsbTableColumnModel<TfInfoModel>;
    public initialGroupValue: TfOrCl;
    public browseTfInfoInitialized$: Observable<boolean>;
    public browseClInfoInitialized$: Observable<boolean>;

    private subscriptions: Subscription = new Subscription();
    public tableTfData$: Observable<TfInfoModel[]>;
    public tableClData$: Observable<ClInfoModel[]>;
    public searchForm: FormControl;
    private isAnanas: boolean;
    private tfOrCl: TfOrCl;
    private queryParams: AsbServerSideFilterModel = initialServerParams;
    constructor(
        private router: Router,
        private store: Store<AppState>,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private releaseService: ReleasesService,
        private seoService: SeoService) {}


    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    ngOnInit() {
        this.isAnanas = this.route.snapshot.data.isAnanas;
        this.searchForm = this.formBuilder.control('')
        this.seoService.updateSeoInfo(this.route.snapshot.data as SeoModel);
        this.browseTfInfo$ = this.store.select(fromSelectors.selectTfInfo);
        this.browseTfInfoLoading$ = this.store.select(fromSelectors.selectTfInfoLoading);
        this.browseClInfo$ = this.store.select(fromSelectors.selectClInfo);
        this.browseClInfoLoading$ = this.store.select(fromSelectors.selectClInfoLoading);
        this.browseTfInfoInitialized$ = this.store.select(fromSelectors.selectTfInfoInitialized);
        this.browseClInfoInitialized$ = this.store.select(fromSelectors.selectClInfoInitialized);
        this.tableTfData$ = this.browseTfInfo$.pipe(map(s => s.results))
        this.tableClData$ = this.browseClInfo$.pipe(map(s => s.results))
        this.subscriptions.add(
            this.route.queryParams.subscribe(
            params => {
                this.queryParams = {
                    ...this.queryParams,
                    pageSize: 25
                }
                switch (params.by) {
                    case "cl":
                        this.initialGroupValue = "cl";
                        this.store.dispatch(new fromActions.data.LoadClInfoAction(
                            this.queryParams
                        ));
                        return;
                    case "tf":
                        this.initialGroupValue = "tf";
                        this.store.dispatch(new fromActions.data.LoadTfInfoAction(
                            this.queryParams,
                        ));
                        return;
                    default:
                        this.router.navigate(["/404"]);
                        return;
                 }
            })
        );

        this.tfColumnModel = {
            uniprotAc: {view: "UniProt AC", columnTemplate: this.uniprotViewTemplate},
            name: {view: "Name"},
            aggregatedSnpsCount: {view: "ASBs count", isDesc: true},
            experimentsCount: {view: "Experiments count", isDesc: true},
            aggregatedSnpsCount010: {view: 'ASBs at 10% FDR', isDesc: true}
        };
        this.clColumnModel = {
            clId: {view: "GTRD ID", columnTemplate: this.cellTypeViewTemplate},
            name: {view: "Cell type name"},
            aggregatedSnpsCount: {view: "ASBs count", isDesc: true},
            aggregatedSnpsCount010: {view: 'ASBs at 10% FDR', isDesc: true},
            experimentsCount: {view: "Experiments count", isDesc: true}
        };
        const releaseVersion = this.releaseService.getReleaseFromFullPath().majorVersion
        if (releaseVersion >= 3) {
            this.clDisplayedColumns.push('aggregatedSnpsCount010', 'aggregatedSnpsCount005')
            this.tfDisplayedColumns.push('aggregatedSnpsCount010', 'aggregatedSnpsCount005')
            this.tfColumnModel.geneName = {view: 'Gene symbol'}
            this.tfColumnModel.aggregatedSnpsCount005 = {view: 'ASBs at 5% FDR', isDesc: true}
            this.tfColumnModel.aggregatedSnpsCount010 = {view: 'ASBs at 10% FDR', isDesc: true}
            this.clColumnModel.aggregatedSnpsCount005 = {view: 'ASBs at 5% FDR', isDesc: true}
            this.clColumnModel.aggregatedSnpsCount010 = {view: 'ASBs at 10% FDR', isDesc: true}
            this.clColumnModel.aggregatedSnpsCount.view = 'ASBs at 25% FDR'
            this.tfColumnModel.aggregatedSnpsCount.view = 'ASBs at 25% FDR'
        }
        if (releaseVersion <= 3) {
            this.tfDisplayedColumns = this.tfDisplayedColumns.filter(v => v !== 'geneName')
        }
        this.subscriptions.add(
            this.searchForm.valueChanges.pipe(debounceTime(400)).subscribe(
                v => {
                    this._handleFilterChange(v)
                    console.log(v)
                }
            )
        )

    }

    _groupToggled(event: MatButtonToggleChange) {
        this.tfOrCl = event.value
        this.router.navigate([],
            {
                relativeTo: this.route,
                queryParams: {by: event.value}
            }).then();
    }

    _handleTableRowClick(event: TfInfoModel | ClInfoModel, tfOrCl: TfOrCl) {
        if (!this.isAnanas) {
            this.subscriptions.add(
                this.store.select(fromSelectors.selectCurrentRelease).subscribe(
                    s => this.router.navigate([`/${s.url}/search/advanced`],
                        {
                            queryParams: tfOrCl === "tf" ? {tf: event.name} : {cl: event.name}
                        }).then()
                )
            );
        } else {
            const url = this.router.serializeUrl(this.router.createUrlTree(
                [`${recentRelease.url}/search/advanced`],
                {
                queryParams: tfOrCl === "tf" ? {tf: event.name} : {cl: event.name},

            }));
            window.open('https://adastra.autosome.ru/' + url, '_blank');
        }


    }

    _handleTableChange(event: AsbServerSideModel, tfOrCl: TfOrCl): void {
        this.queryParams = {
            ...this.queryParams,
            ...event
        }
        tfOrCl === "cl" ?
            this.store.dispatch(new fromActions.data.LoadClInfoAction(event)) :
            this.store.dispatch(new fromActions.data.LoadTfInfoAction(event));
    }

    _getPaginatorOptions(length: number): number[] {
        return getPaginatorOptions(length);
    }

    _handleFilterChange(regexp: string): void {
        this.queryParams = {
            ...this.queryParams,
            regexp
        }
        this.tfOrCl ? this.store.dispatch(new fromActions.data.LoadClInfoAction(this.queryParams)) :
                    this.store.dispatch(new fromActions.data.LoadTfInfoAction(this.queryParams));
    }
}
