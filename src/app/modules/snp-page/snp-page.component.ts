import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {Observable, Subject} from "rxjs";
import {SnpInfoModel, TfSnpModel} from "src/app/models/data.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/reducer";
import * as fromSelectors from "src/app/store/selector";
import * as fromActions from "src/app/store/action";
import {AsbTableComponent} from "src/app/modules/helpers/table-template/table.component";
import {
    AsbTableColumnModel,
    AsbTableDisplayedColumns} from "src/app/models/table.model";
import {FormBuilder, FormControl} from "@angular/forms";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'asb-snp-page',
  templateUrl: './snp-page.component.html',
  styleUrls: ['./snp-page.component.less']
})
export class SnpPageComponent implements OnInit, OnDestroy {
    @ViewChild("tableView", {static: true})
    public tableView: AsbTableComponent<Partial<TfSnpModel>>;


    public id: string = "";
    public snpData$: Observable<SnpInfoModel>;
    public snpDataLoading$: Observable<boolean>;
    private destroy$ = new Subject<void>();
    public viewStatisticsAsTable: boolean = true;

    public tableDisplayedColumns: AsbTableDisplayedColumns<TfSnpModel> = [
        "name",
        "effectSizeRef",
        "effectSizeAlt",
        "pValueRef",
        "pValueAlt",
        "meanBad",
    ];
    public tableColumnModel: AsbTableColumnModel<TfSnpModel>;
    public columnsFormControl: FormControl;
    public nonStickyColumnModel: AsbTableColumnModel<Partial<TfSnpModel>> = {};
    public stickyColumnModel: AsbTableColumnModel<Partial<TfSnpModel>> = {};

    constructor(
        private store: Store<AppState>,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private titleService: Title) {}

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        this.destroy$ = null;
    }

    ngOnInit() {
        this.tableColumnModel = {
            name: {view: "TF name", valueConverter: v => v},
            effectSizeRef: {view: "Effect size ref", valueConverter: v => v ? v.toFixed(2) : 'NaN'},
            effectSizeAlt: {view: "Effect size alt", valueConverter: v => v ? v.toFixed(2) : 'NaN'},
            pValueRef: {view: "p-value ASB", valueConverter: v => v ? v.toFixed(2) : 'NaN'},
            pValueAlt: {view: "p-value ASB", valueConverter: v => v ? v.toFixed(2) : 'NaN'},
            meanBad: {view: "mean BAD", valueConverter: v => v ? v.toFixed(2) : 'NaN'}
        };
        Object.keys(this.tableColumnModel).forEach(
            key => key !== "name" ?
                this.nonStickyColumnModel[key] = this.tableColumnModel[key]
                : this.stickyColumnModel[key] = this.tableColumnModel[key]
        );


        this.columnsFormControl = this.formBuilder.control(Object.keys(this.nonStickyColumnModel));
        this.snpData$ = this.store.select(fromSelectors.selectSnpInfoData);
        this.snpDataLoading$ = this.store.select(fromSelectors.selectSnpInfoDataLoading);
        this.id = this.route.snapshot.paramMap.get("id");
        this.titleService.setTitle(this.route.snapshot.data.title + this.id);
        this.store.dispatch(new fromActions.data.LoadSnpInfoAction({id: this.id}))
    }

    originalOrder = (): number => {
        return 0;
    };
    _changeColumns(event: MatSelectChange) {
        this.tableDisplayedColumns = [
            ...Object.keys(this.stickyColumnModel),
            ...event.value
        ]


    }
    _changeView() {
        this.viewStatisticsAsTable = !this.viewStatisticsAsTable
    }
}
