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
import {ClInfoModel, TfInfoModel, AggType, AbstractInfoModel} from "../../../models/data.model";
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
    // tslint:disable-next-line:component-selector
    selector: "asb-browse-tf",
    templateUrl: "./browse-page.component.html",
    styleUrls: ["./browse-page.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class BrowsePageComponent implements OnInit, OnDestroy {
    @ViewChild("tableAtacView", {static: true})
    public tfTableView: AsbServerTableComponent<ClInfoModel>;

    @ViewChild("tableDnaseView", {static: true})
    public clTableView: AsbServerTableComponent<ClInfoModel>;

    @ViewChild("tableFaireView", {static: true})
    public faireTableView: AsbServerTableComponent<ClInfoModel>;

    @ViewChild("cellTypeViewTemplate", {static: true})
    public cellTypeViewTemplate: TemplateRef<{value: string}>;

    @ViewChild("uniprotViewTemplate", {static: true})
    public uniprotViewTemplate: TemplateRef<{value: string}>;

    public browseAtacInfo$: Observable<{results: ClInfoModel[], total: number}>;
    public browseAtacInfoLoading$: Observable<boolean>;


    public browseDnaseInfo$: Observable<{results: ClInfoModel[], total: number}>;
    public browseDnaseInfoLoading$: Observable<boolean>;

    public browseFaireInfo$: Observable<{results: ClInfoModel[], total: number}>;
    public browseFaireInfoLoading$: Observable<boolean>;

    public dnaseDisplayedColumns: AsbTableDisplayedColumns<AbstractInfoModel> = [
        "name",
        "experimentsCount",
        "aggregatedSnpsCount",
    ];
    public atacDisplayedColumns: AsbTableDisplayedColumns<AbstractInfoModel> = [
        "name",
        "experimentsCount",
        "aggregatedSnpsCount",
    ];
    public columnModel: AsbTableColumnModel<ClInfoModel>;

    public faireDisplayedColumns: AsbTableDisplayedColumns<AbstractInfoModel> = [
        "name",
        "experimentsCount",
        "aggregatedSnpsCount",
    ];
    public faireColumnModel: AsbTableColumnModel<AbstractInfoModel>;

    public initialGroupValue: AggType;
    private aggType: AggType;

    public browseAtacInfoInitialized$: Observable<boolean>;
    public browseDnaseInfoInitialized$: Observable<boolean>;
    public browseFaireInfoInitialized$: Observable<boolean>;


    public tableAtacData$: Observable<ClInfoModel[]>;
    public tableFaireData$: Observable<ClInfoModel[]>;
    public tableDnaseData$: Observable<ClInfoModel[]>;

    public searchForm: FormControl;
    public isAnanas: boolean;
    private subscriptions: Subscription = new Subscription();

    private queryParams: AsbServerSideFilterModel = {
        ...initialServerParams,
        direction: 'asc',
        active: 'name'
    };
    constructor(
        private router: Router,
        private store: Store<AppState>,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private releaseService: ReleasesService,
        private seoService: SeoService) {}


    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    ngOnInit(): void {
        this.isAnanas = this.route.snapshot.data.isAnanas;
        this.searchForm = this.formBuilder.control('');
        this.seoService.updateSeoInfo(this.route.snapshot.data as SeoModel);

        this.browseAtacInfo$ = this.store.select(fromSelectors.selectAtacInfo);
        this.browseAtacInfoLoading$ = this.store.select(fromSelectors.selectAtacInfoLoading);
        this.browseAtacInfoInitialized$ = this.store.select(fromSelectors.selectAtacInfoInitialized);

        this.browseDnaseInfo$ = this.store.select(fromSelectors.selectDnaseInfo);
        this.browseDnaseInfoInitialized$ = this.store.select(fromSelectors.selectDnaseInfoInitialized);
        this.browseDnaseInfoLoading$ = this.store.select(fromSelectors.selectDnaseInfoLoading);

        this.browseFaireInfo$ = this.store.select(fromSelectors.selectFaireInfo);
        this.browseFaireInfoInitialized$ = this.store.select(fromSelectors.selectFaireInfoInitialized);
        this.browseFaireInfoLoading$ = this.store.select(fromSelectors.selectFaireInfoLoading);

        this.tableAtacData$ = this.browseAtacInfo$.pipe(map(s => s.results));
        this.tableDnaseData$ = this.browseDnaseInfo$.pipe(map(s => s.results));
        this.tableFaireData$ = this.browseFaireInfo$.pipe(map(s => s.results));

        this.subscriptions.add(
            this.route.queryParams.subscribe(
            params => {
                this.queryParams = {
                    ...this.queryParams,
                    pageSize: 25
                };
                switch (params.by) {
                    case "dnase":
                        this.initialGroupValue = "dnase";
                        this.aggType = 'dnase';
                        this.store.dispatch(new fromActions.data.LoadDnaseInfoAction(
                            this.queryParams,
                        ));
                        return;
                    case "atac":
                        this.initialGroupValue = "atac";
                        this.aggType = 'atac';
                        this.store.dispatch(new fromActions.data.LoadAtacInfoAction(
                            this.queryParams
                        ));
                        return;

                    case "faire":
                        this.initialGroupValue = "faire";
                        this.aggType = 'faire';
                        this.store.dispatch(new fromActions.data.LoadFaireInfoAction(
                            this.queryParams,
                        ));
                        return;
                    default:
                        this.router.navigate(["/404"]);
                        return;
                 }
            })
        );
        this.dnaseDisplayedColumns.push('aggregatedSnpsCount010', 'aggregatedSnpsCount005');
        this.atacDisplayedColumns.push('aggregatedSnpsCount010', 'aggregatedSnpsCount005');

        this.columnModel = {
            name: {view: "Name"},
            aggregatedSnpsCount: {view: "ASAs count at 25% FDR", isDesc: true},
            experimentsCount: {view: "Experiments count", isDesc: true},
            aggregatedSnpsCount010: {view: 'ASAs at 10% FDR', isDesc: true},
            aggregatedSnpsCount005: {view: 'ASAs at 5% FDR', isDesc: true}
        };
        this.subscriptions.add(
            this.searchForm.valueChanges.pipe(debounceTime(400)).subscribe(
                v => {
                    this._handleFilterChange(v);
                }
            )
        );

    }

    _groupToggled(event: MatButtonToggleChange): void {
        this.aggType = event.value;
        this.router.navigate([],
            {
                relativeTo: this.route,
                queryParams: {by: event.value}
            }).then();
    }

    _handleTableRowClick(event: TfInfoModel | ClInfoModel, aggType: AggType): void {
        if (!this.isAnanas) {
            this.subscriptions.add(
                this.store.select(fromSelectors.selectCurrentRelease).subscribe(
                    s => this.router.navigate([`/${s.url}/search/advanced`],
                        {
                            queryParams: {[aggType]: event.name}
                        }).then()
                )
            );
        } else {
            const url = this.router.serializeUrl(this.router.createUrlTree(
                [`${recentRelease.url}/search/advanced`],
                {
                queryParams: {[aggType]: event.name},

            }));
            window.open('https://udacha.autosome.org/' + url, '_blank');
        }


    }

    _handleTableChange(event: AsbServerSideModel, aggType: AggType): void {
        this.queryParams = {
            ...this.queryParams,
            ...event
        };
        switch (aggType) {
            case "faire":
                this.store.dispatch(new fromActions.data.LoadFaireInfoAction(event));
                break;
            case "atac":
                this.store.dispatch(new fromActions.data.LoadAtacInfoAction(event));
                break;
            case "dnase":
                this.store.dispatch(new fromActions.data.LoadDnaseInfoAction(event));
                break;
        }
    }

    _getPaginatorOptions(length: number): number[] {
        return getPaginatorOptions(length);
    }

    _handleFilterChange(regexp: string): void {
        this.queryParams = {
            ...this.queryParams,
            regexp
        };
        switch (this.aggType) {
            case "dnase":
                this.store.dispatch(new fromActions.data.LoadDnaseInfoAction(this.queryParams));
                break;
            case "atac":
                this.store.dispatch(new fromActions.data.LoadAtacInfoAction(this.queryParams));
                break;
            case "faire":
                this.store.dispatch(new fromActions.data.LoadFaireInfoAction(this.queryParams));
                break;
        }
    }
}
