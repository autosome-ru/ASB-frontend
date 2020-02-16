import {ChangeDetectionStrategy, Component, HostBinding, Input, OnInit, ViewEncapsulation} from '@angular/core';

import {ClSnpModel, TfSnpModel} from "src/app/models/data.model";
import {AsbTableColumnModel, AsbTableDisplayedColumns} from "src/app/models/table.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSelectChange} from "@angular/material/select";

@Component({
    selector: 'asb-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['../snp-page.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AsbStatisticsComponent implements OnInit {

    @Input()
    public objectData: TfSnpModel[] | ClSnpModel[];

    public tableDisplayedColumns: AsbTableDisplayedColumns<TfSnpModel> = [
        "name",
        "effectSizeRef",
        "effectSizeAlt",
        "pValueRef",
        "pValueAlt",
        "meanBad",
    ];
    public tableColumnModel: AsbTableColumnModel<TfSnpModel | ClSnpModel>;
    public tableFormGroup: FormGroup;
    public nonStickyColumnModel: AsbTableColumnModel<Partial<TfSnpModel> | Partial<ClSnpModel>> = {};
    public filteredObjectData: TfSnpModel[] | ClSnpModel[];

    constructor(private formBuilder: FormBuilder,) { }

    ngOnInit(): void {
        this.filteredObjectData = this.objectData;
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
