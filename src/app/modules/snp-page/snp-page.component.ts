import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
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
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSelectChange} from "@angular/material/select";
import {map} from "rxjs/operators";

@Component({
    selector: 'asb-snp-page',
    templateUrl: './snp-page.component.html',
    styleUrls: ['./snp-page.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnpPageComponent implements OnInit, OnDestroy {
    @ViewChild("tableView", {static: true})
    public tableView: AsbTableComponent<TfSnpModel>;


    public id: string = "";
    public snpData$: Observable<SnpInfoModel>;
    public snpDataLoading$: Observable<boolean>;
    private destroy$ = new Subject<void>();

    public tableDisplayedColumns: AsbTableDisplayedColumns<TfSnpModel> = [
        "name",
        "effectSizeRef",
        "effectSizeAlt",
        "pValueRef",
        "pValueAlt",
        "meanBad",
    ];
    public tableColumnModel: AsbTableColumnModel<TfSnpModel>;
    public tableFormGroup: FormGroup;
    public nonStickyColumnModel: AsbTableColumnModel<Partial<TfSnpModel>> = {};
    public filteredTfData$: Observable<TfSnpModel[]>;

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
        this.id = this.route.snapshot.paramMap.get("id");
        this.titleService.setTitle(this.route.snapshot.data.title + this.id);
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
                : null
        );


        this.tableFormGroup = this.formBuilder.group({
            columns: [Object.keys(this.nonStickyColumnModel), null],
            filter: null,

        });
        this.snpData$ = this.store.select(fromSelectors.selectSnpInfoData);
        this.filteredTfData$ = this.snpData$.pipe(map(s => s.transFactors));
        this.snpDataLoading$ = this.store.select(fromSelectors.selectSnpInfoDataLoading);
        this.store.dispatch(new fromActions.data.LoadSnpInfoAction({id: this.id}))
    }

    originalOrder = (): number => {
        return 0;
    };
    _changeColumns(event: MatSelectChange) {
        this.tableDisplayedColumns = [
            "name",
            ...event.value
        ]
    }

    _applyFilter() {
        this.filteredTfData$ = this.snpData$.pipe(map(s =>
            s.transFactors.filter(s => this.filterData(s, this.tableFormGroup.get('filter').value))));

    }
    _clearFilterField() {
        this.tableFormGroup.patchValue({filter: null})
    }

    filterData(row: TfSnpModel, search: string) {
        let result = true;
        if (search) {
            result = result && Object.keys(row).some(key => {
                const converter = (this.tableColumnModel[key] && this.tableColumnModel[key].valueConverter)
                    || (v => String(v));
                return converter(row[key]).toLowerCase().indexOf(search.trim().toLowerCase()) !== -1;
            });
        }
        return result
    }
}
