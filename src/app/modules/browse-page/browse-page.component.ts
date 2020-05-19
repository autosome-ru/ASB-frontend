import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "src/app/store/reducer";
import * as fromSelectors from "src/app/store/selector";
import * as fromActions from "src/app/store/action";
import {Observable, Subscription} from "rxjs";
import {ClInfoModel, TfInfoModel, TfOrCl, TotalInfoModel} from "../../models/data.model";
import {AsbServerSideModel, AsbTableColumnModel, AsbTableDisplayedColumns} from "../../models/table.model";
import {MatButtonToggleChange} from "@angular/material/button-toggle";
import {SeoModel} from "../../models/seo.model";
import {SeoService} from "../../services/seo.servise";
import {AsbServerTableComponent} from "../helpers/table-template/server-side/table-server.component";
import {initialServerParams} from "../../helpers/constants";


@Component({
    selector: "asb-browse-tf",
    templateUrl: "./browse-page.component.html",
    styleUrls: ["./browse-page.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
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

    public browseTfInfo$: Observable<TfInfoModel[]>;
    public browseTfInfoLoading$: Observable<boolean>;


    public browseClInfo$: Observable<ClInfoModel[]>;
    public browseClInfoLoading$: Observable<boolean>;

    public clDisplayedColumns: AsbTableDisplayedColumns<ClInfoModel> = [
        "name",
        "aggregatedSnpsCount",
        "experimentsCount",
    ];
    public clColumnModel: AsbTableColumnModel<ClInfoModel>;
    public tfDisplayedColumns: AsbTableDisplayedColumns<TfInfoModel> = [
        "name",
        "uniprotAc",
        "aggregatedSnpsCount",
        "experimentsCount",
    ];

    public tfColumnModel: AsbTableColumnModel<TfInfoModel>;
    public initialGroupValue: TfOrCl;
    public totalInfo$: Observable<TotalInfoModel>;
    public browseTfInfoInitialized$: Observable<boolean>;
    public browseClInfoInitialized$: Observable<boolean>;

    private subscriptions: Subscription = new Subscription();




    constructor(
        private router: Router,
        private store: Store<AppState>,
        private route: ActivatedRoute,
        private seoService: SeoService) {}


    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    ngOnInit() {
        this.seoService.updateSeoInfo(this.route.snapshot.data as SeoModel);
        this.browseTfInfo$ = this.store.select(fromSelectors.selectTfInfo);
        this.browseTfInfoLoading$ = this.store.select(fromSelectors.selectTfInfoLoading);

        this.totalInfo$ = this.store.select(fromSelectors.selectTotalInfo);

        this.browseClInfo$ = this.store.select(fromSelectors.selectClInfo);
        this.browseClInfoLoading$ = this.store.select(fromSelectors.selectClInfoLoading);
        this.browseTfInfoInitialized$ = this.store.select(fromSelectors.selectTfInfoInitialized);
        this.browseClInfoInitialized$ = this.store.select(fromSelectors.selectClInfoInitialized);

        this.subscriptions.add(
            this.route.queryParams.subscribe(
            params => {
                switch (params.by) {
                    case "cl":
                        this.initialGroupValue = "cl";
                        this.store.dispatch(new fromActions.data.LoadClInfoAction({
                            ...initialServerParams,
                            pageSize: 10,
                        }));
                        return;
                    case "tf":
                        this.initialGroupValue = "tf";
                        this.store.dispatch(new fromActions.data.LoadTfInfoAction({
                            ...initialServerParams,
                            pageSize: 10
                        }));
                        return;
                    default:
                        this.router.navigate(["/404"]);
                        return;
                 }
            })
        );
        this.store.dispatch(new fromActions.data.InitTotalInfoAction());


        this.tfColumnModel = {
            uniprotAc: {view: "Uniprot AC", columnTemplate: this.uniprotViewTemplate},
            name: {view: "Name"},
            aggregatedSnpsCount: {view: "SNPs count"},
            experimentsCount: {view: "Experiments count"}
        };
        this.clColumnModel = {
            name: {view: "Cell type name", columnTemplate: this.cellTypeViewTemplate},
            aggregatedSnpsCount: {view: "SNPs count"},
            experimentsCount: {view: "Experiments count"}
        };

    }

    _groupToggled(event: MatButtonToggleChange) {
        this.router.navigate([],
            {
                relativeTo: this.route,
                queryParams: {by: event.value}
            }).then();
    }

    _handleTableRowClick(event: TfInfoModel | ClInfoModel, tfOrCl: TfOrCl) {
        this.router.navigate(["/search/advanced"],
            {
                queryParams: tfOrCl === "tf" ? {tf: event.name} : {cl: event.name}
            }).then();
    }

    _handleTableChange(event: AsbServerSideModel, tfOrCl: TfOrCl) {
        tfOrCl === "cl" ?
            this.store.dispatch(new fromActions.data.LoadClInfoAction(event)) :
            this.store.dispatch(new fromActions.data.LoadTfInfoAction(event));
    }
}
