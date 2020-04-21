import {ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {Store} from "@ngrx/store";
import {AppState} from "src/app/store/reducer";
import * as fromSelectors from "src/app/store/selector";
import * as fromActions from "src/app/store/action";

import {Observable} from "rxjs";
import {TfInfoModel, TfSnpCutModel} from "../../../models/data.model";
import {AsbTableColumnModel, AsbTableDisplayedColumns} from "../../../models/table.model";


@Component({
    selector: "asb-browse-tf",
    templateUrl: "./browse-tf-page.component.html",
    styleUrls: ["../browse-page.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseTfPageComponent implements OnInit {

    @ViewChild("uniprotViewTemplate", {static: true})
    public uniprotViewTemplate: TemplateRef<{value: string}>;



    public browseTfInfo$: Observable<TfInfoModel[]>;
    public browseTfInfoLoading$: Observable<boolean>;


    public displayedColumns: AsbTableDisplayedColumns<TfInfoModel> = [
        "name",
        "id",
        "aggregatedSnpsCount",
        "experimentsCount",
    ];

    public columnModel: AsbTableColumnModel<TfInfoModel>;

    constructor(
        private router: Router,
        private store: Store<AppState>,
        private route: ActivatedRoute,
        private titleService: Title) {}


    ngOnInit() {
        this.titleService.setTitle(this.route.snapshot.data.title("tf"));
        this.browseTfInfo$ = this.store.select(fromSelectors.selectTfInfo);
        this.browseTfInfoLoading$ = this.store.select(fromSelectors.selectTfInfoLoading);

        this.columnModel = {
            id: {view: "Uniprot AC", columnTemplate: this.uniprotViewTemplate},
            name: {view: "Name"},
            aggregatedSnpsCount: {view: "SNPs count"},
            experimentsCount: {view: "Experiments count"}
        };
        this.store.dispatch(new fromActions.data.InitTfInfoAction());
    }

}
