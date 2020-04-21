import {ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {Store} from "@ngrx/store";
import {AppState} from "src/app/store/reducer";
import * as fromSelectors from "src/app/store/selector";
import * as fromActions from "src/app/store/action";
import {ClInfoModel} from "../../../models/data.model";
import {Observable} from "rxjs";
import {AsbTableColumnModel, AsbTableDisplayedColumns} from "../../../models/table.model";
import {AsbTableComponent} from "../../helpers/table-template/table.component";
import {getPaginatorOptions} from "../../../helpers/check-functions.helper";


@Component({
    selector: "asb-browse-cl",
    templateUrl: "./browse-cl-page.component.html",
    styleUrls: ["../browse-page.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseClPageComponent implements OnInit {
    @ViewChild("tableView", {static: true})
    public tableView: AsbTableComponent<ClInfoModel>;
    @ViewChild("cellTypeViewTemplate", {static: true})
    public cellTypeViewTemplate: TemplateRef<{value: string}>;

    public sampleData: ClInfoModel[] = [
        {
            name: '123',
            id: '1231',
            aggregatedSnpsCount: 2,
            experimentsCount: 5,
        },
        {
            name: '345',
            id: '123',
            aggregatedSnpsCount: 3,
            experimentsCount: 4,
        },
    ];

    public browseClInfo$: Observable<ClInfoModel[]>;
    public browseClInfoLoading$: Observable<boolean>;

    public displayedColumns: AsbTableDisplayedColumns<ClInfoModel> = [
        "name",
        "aggregatedSnpsCount",
        "experimentsCount",
    ];
    public columnModel: AsbTableColumnModel<ClInfoModel>;

    constructor(
        private router: Router,
        private store: Store<AppState>,
        private route: ActivatedRoute,
        private titleService: Title) {}


    ngOnInit() {
        this.titleService.setTitle(this.route.snapshot.data.title("cl"));

        this.browseClInfo$ = this.store.select(fromSelectors.selectClInfo);
        this.browseClInfoLoading$ = this.store.select(fromSelectors.selectClInfoLoading);

        this.columnModel = {
            name: {view: "Cell type name", columnTemplate: this.cellTypeViewTemplate},
            aggregatedSnpsCount: {view: "SNPs count"},
            experimentsCount: {view: "Experiments count"}
        };

        this.store.dispatch(new fromActions.data.InitClInfoAction());
    }
    _getPaginatorOptions(array: ClInfoModel[]) {
        return array ? getPaginatorOptions(array.length) : [];
    }
}
