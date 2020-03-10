import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {Observable, Subject} from "rxjs";
import {ClSnpModel, SnpInfoModel, TfSnpModel} from "src/app/models/data.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/reducer";
import * as fromSelectors from "src/app/store/selector";
import * as fromActions from "src/app/store/action";
import {AsbTableColumnModel, AsbTableDisplayedColumns} from "../../models/table.model";


@Component({
    selector: "asb-snp-page",
    templateUrl: "./snp-page.component.html",
    styleUrls: ["./snp-page.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnpPageComponent implements OnInit {

    public id: string;
    public alt: string;
    public snpData$: Observable<SnpInfoModel>;
    public snpDataLoading$: Observable<boolean>;

    public clColumnModel: AsbTableColumnModel<Partial<ClSnpModel>> = {
        name: {view: "CL name", valueConverter: v => v},
       ...commonColumnModel,
    };
    public clDisplayedColumns: AsbTableDisplayedColumns<ClSnpModel> = [
        ...commonInitialDisplayedColumns,
    ];


    public tfColumnModel: AsbTableColumnModel<Partial<TfSnpModel>> = {
        name: {view: "TF name", valueConverter: v => v},
        ...commonColumnModel,
        motifFc: {view: "Fold change", valueConverter: v => v !== null ? v.toFixed(2) : "No info"},
        motifConcordance: {view: "Concordance", valueConverter:
                    v => v !== null ? v ? "concordant" : "discordant"  : "NaN"},
    };
    public tfDisplayedColumns: AsbTableDisplayedColumns<TfSnpModel> = [
        ...commonInitialDisplayedColumns,
        "motifFc",
    ];
    public phenotypesEmpty: boolean;


    constructor(
        private store: Store<AppState>,
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false; }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get("rsId");
        this.alt = this.route.snapshot.paramMap.get("alt");
        this.titleService.setTitle(this.route.snapshot.data.title + this.id);

        this.snpData$ = this.store.select(fromSelectors.selectSnpInfoDataById, this.id + this.alt);
        this.snpDataLoading$ = this.store.select(fromSelectors.selectSnpInfoDataLoadingById, this.id + this.alt);
        this.store.dispatch(new fromActions.data.InitSnpInfoAction(
            {rsId: this.id, alt: this.alt}));
    }
}

const commonColumnModel:
    AsbTableColumnModel<Partial<TfSnpModel> | Partial<ClSnpModel>> = {
    effectSizeRef: {view: "Effect size ref", valueConverter: v => v !== null ? v.toFixed(2) : "NaN"},
    effectSizeAlt: {view: "Effect size alt", valueConverter: v => v !== null ? v.toFixed(2) : "NaN"},
    pValueRef: {view: "p-value ASB ref", valueConverter: v => v !== null ? v.toFixed(2) : "NaN"},
    pValueAlt: {view: "p-value ASB alt", valueConverter: v => v !== null ? v.toFixed(2) : "NaN"},
    meanBad: {view: "mean BAD", valueConverter: v => v.toFixed(2), helpMessage: "this is mean BAD"}
};
const commonInitialDisplayedColumns: AsbTableDisplayedColumns<Partial<TfSnpModel> | Partial<ClSnpModel>> = [
    "name",
    "effectSizeRef",
    "effectSizeAlt",
    "pValueRef",
    "pValueAlt",
    "meanBad",
];
