import {ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {Store} from "@ngrx/store";
import {AppState} from "src/app/store/reducer";
import * as fromSelectors from "src/app/store/selector";
import * as fromActions from "src/app/store/action";
import {Observable} from "rxjs";
import {ClInfoModel, TfInfoModel, TfOrCl} from "../../models/data.model";
import {AsbTableColumnModel, AsbTableDisplayedColumns} from "../../models/table.model";
import {getPaginatorOptions} from "../../helpers/check-functions.helper";
import {AsbTableComponent} from "../helpers/table-template/table.component";
import {MatButtonToggleChange} from "@angular/material/button-toggle";


@Component({
    selector: "asb-browse-tf",
    templateUrl: "./browse-page.component.html",
    styleUrls: ["./browse-page.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowsePageComponent implements OnInit {
    @ViewChild("tableTfView", {static: true})
    public tfTableView: AsbTableComponent<TfInfoModel>;

    @ViewChild("tableClView", {static: true})
    public clTableView: AsbTableComponent<ClInfoModel>;

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
        "id",
        "aggregatedSnpsCount",
        "experimentsCount",
    ];

    public tfColumnModel: AsbTableColumnModel<TfInfoModel>;
    public initialGroupValue: TfOrCl;

    constructor(
        private router: Router,
        private store: Store<AppState>,
        private route: ActivatedRoute,
        private titleService: Title) {}


    ngOnInit() {
        this.titleService.setTitle(this.route.snapshot.data.title);
        this.browseTfInfo$ = this.store.select(fromSelectors.selectTfInfo);
        this.browseTfInfoLoading$ = this.store.select(fromSelectors.selectTfInfoLoading);

        this.browseClInfo$ = this.store.select(fromSelectors.selectClInfo);
        this.browseClInfoLoading$ = this.store.select(fromSelectors.selectClInfoLoading);

        this.route.queryParams.subscribe(
            params => {
                switch (params.by) {
                    case "cl":
                        this.initialGroupValue = "cl";
                        this.store.dispatch(new fromActions.data.InitClInfoAction());
                        return;
                    case "tf":
                        this.initialGroupValue = "tf";
                        this.store.dispatch(new fromActions.data.InitTfInfoAction());
                        return;
                    default:
                        this.router.navigateByUrl("/browse",
                            {
                                queryParams: {by: "tf"}
                            });
                        return;
                 }
            }
        );


        this.tfColumnModel = {
            id: {view: "Uniprot AC", columnTemplate: this.uniprotViewTemplate},
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

    _getPaginatorOptions(array: TfInfoModel[]) {
        return array ? getPaginatorOptions(array.length) : [];
    }

    _groupToggled(event: MatButtonToggleChange) {
        this.router.navigate([],
            {
                relativeTo: this.route,
                queryParams: {by: event.value}
            });
    }

    _handleTableRowClick(event: TfInfoModel | ClInfoModel, tfOrCl: TfOrCl) {
        this.router.navigateByUrl("/search/advanced",
            {
                queryParams: tfOrCl === "tf" ? {tf: event.name} : {cl: event.name}
        });
    }
}
