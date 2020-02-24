import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';

import {ClSnpModel, TfSnpModel} from "src/app/models/data.model";
import {AsbTableColumnModel, AsbTableDisplayedColumns} from "src/app/models/table.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSelectChange} from "@angular/material/select";
import {calculateColor} from "../../../helpers/colors.helper";
import {Subject} from "rxjs";

@Component({
    selector: 'asb-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['../snp-page.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AsbStatisticsComponent implements OnInit, OnDestroy {

    @Input()
    public objectData: TfSnpModel[] | ClSnpModel[];

    @Input()
    public tableColumnModel: AsbTableColumnModel<TfSnpModel | ClSnpModel>;

    @Input()
    private readonly initialDisplayedColumns: AsbTableDisplayedColumns<TfSnpModel | ClSnpModel> = [
        "name",
        "effectSizeRef",
        "effectSizeAlt",
        "pValueRef",
        "pValueAlt",
        "meanBad",
    ];

    private destroy$ = new Subject<void>();
    public tableDisplayedColumns: AsbTableDisplayedColumns<TfSnpModel | ClSnpModel>;
    public tableFormGroup: FormGroup;
    public nonStickyColumnModel: AsbTableColumnModel<Partial<TfSnpModel> | Partial<ClSnpModel>> = {};
    public filteredObjectData: (TfSnpModel | ClSnpModel)[];

    constructor(private formBuilder: FormBuilder,) { }
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        this.destroy$ = null;
    }

    ngOnInit(): void {
        this.tableDisplayedColumns = this.initialDisplayedColumns;
        this.filteredObjectData = this.objectData;
        Object.keys(this.tableColumnModel).forEach(
            key => key !== "name" ?
                this.nonStickyColumnModel[key] = this.tableColumnModel[key]
                : null
        );

        this.tableFormGroup = this.formBuilder.group({
            columns: [this.initialDisplayedColumns.filter(s => s !== "name"), null],
            filter: null,
        });
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
        this.filteredObjectData =
            this.objectData.filter(s => this.filterData(s, this.tableFormGroup.get('filter').value));

    }
    _clearFilterField() {
        this.tableFormGroup.patchValue({filter: null})
    }

    filterData(row: TfSnpModel | ClSnpModel, search: string) {
        let result = true;
        if (search) {
            result = result &&
                row.name.toLowerCase().indexOf(search.trim().toLowerCase()) !== -1;
        }
        return result
    }
    _calculateColor(row: TfSnpModel | ClSnpModel) {
        return {'background-color': calculateColor(row.pValueRef, row.pValueAlt)}
    }

    _resetFilters() {
        this.tableDisplayedColumns = this.initialDisplayedColumns;
        this.filteredObjectData = this.objectData;
        this.tableFormGroup.patchValue({
            columns: Object.keys(this.nonStickyColumnModel),
            filter: null,
        })
    }
    _getPaginatorOptions(): number[] {
        return this.filteredObjectData.length > 20 ?
            [5, 10, 25, 50, this.filteredObjectData.length] :
            [5, 10, 25, 50]
    }
}
