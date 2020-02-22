import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {Observable, Subject} from "rxjs";
import {ClSnpModel, SnpInfoModel, TfSnpModel} from "src/app/models/data.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/reducer";
import * as fromSelectors from "src/app/store/selector";
import * as fromActions from "src/app/store/action";
import {AsbTableComponent} from "src/app/modules/helpers/table-template/table.component";
import {AsbTableColumnModel, AsbTableDisplayedColumns} from "../../models/table.model";


@Component({
    selector: 'asb-snp-page',
    templateUrl: './snp-page.component.html',
    styleUrls: ['./snp-page.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.Emulated,
})
export class SnpPageComponent implements OnInit, OnDestroy {
    @ViewChild("tableView", {static: true})
    public tableView: AsbTableComponent<TfSnpModel | ClSnpModel>;

    public id: string;
    public alt: string;
    public snpData$: Observable<SnpInfoModel>;
    public snpDataLoading$: Observable<boolean>;
    private destroy$ = new Subject<void>();

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
        motifFc: {view: "Fold change", valueConverter: v => v !== null ? v.toFixed(2) : 'No info'},
        motifConcordance: {view: "Concordance", valueConverter:
                    v => v !== null ? v ? "concordant" : "discordant"  : 'NaN'},
    };
    public tfDisplayedColumns: AsbTableDisplayedColumns<TfSnpModel> = [
        ...commonInitialDisplayedColumns,
        'motifFc',
    ];


    constructor(
        private store: Store<AppState>,
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false}

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        this.destroy$ = null;
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get("rsId");
        this.alt = this.route.snapshot.paramMap.get("alt");
        this.titleService.setTitle(this.route.snapshot.data.title + this.id);

        this.snpData$ = this.store.select(fromSelectors.selectSnpInfoData);
        this.snpDataLoading$ = this.store.select(fromSelectors.selectSnpInfoDataLoading);
        this.store.dispatch(new fromActions.data.LoadSnpInfoAction(
            {rsId: this.id.slice(2), alt: this.alt}))
    }

}

const commonColumnModel:
    AsbTableColumnModel<Partial<TfSnpModel> | Partial<ClSnpModel>> = {
    effectSizeRef: {view: "Effect size ref", valueConverter: v => v !== null ? v.toFixed(2) : 'NaN'},
    effectSizeAlt: {view: "Effect size alt", valueConverter: v => v !== null ? v.toFixed(2) : 'NaN'},
    pValueRef: {view: "p-value ASB ref", valueConverter: v => v !== null ? v.toFixed(2) : 'NaN'},
    pValueAlt: {view: "p-value ASB alt", valueConverter: v => v !== null ? v.toFixed(2) : 'NaN'},
    meanBad: {view: "mean BAD", valueConverter: v =>v.toFixed(2)}
};
const commonInitialDisplayedColumns: AsbTableDisplayedColumns<Partial<TfSnpModel> | Partial<ClSnpModel>> = [
    "name",
    "effectSizeRef",
    "effectSizeAlt",
    "pValueRef",
    "pValueAlt",
    "meanBad",
];
