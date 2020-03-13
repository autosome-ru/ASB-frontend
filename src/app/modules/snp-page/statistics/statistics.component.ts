import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";

import {ClSnpModel, ExpSnpModel, TfSnpModel} from "src/app/models/data.model";
import {AsbTableColumnModel, AsbTableDisplayedColumns} from "src/app/models/table.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSelectChange} from "@angular/material/select";
import {calculateColor} from "../../../helpers/colors.helper";
import {Subject} from "rxjs";
import {getPaginatorOptions} from "../../../helpers/check-functions.helper";
import {AsbTableComponent} from "../../helpers/table-template/table.component";

@Component({
    selector: "asb-statistics",
    templateUrl: "./statistics.component.html",
    styleUrls: ["../snp-page.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AsbStatisticsComponent implements OnInit, OnDestroy {

    constructor(private formBuilder: FormBuilder, ) { }
    @ViewChild("tableViewTFCL", {static: true})
    public tableView: AsbTableComponent<TfSnpModel> | AsbTableComponent<ClSnpModel>;

    @Input()
    public objectData: TfSnpModel[] | ClSnpModel[];

    @Input()
    public tableColumnModel: AsbTableColumnModel<TfSnpModel> | AsbTableColumnModel<ClSnpModel> ;

    @Input()
    private readonly initialDisplayedColumns: AsbTableDisplayedColumns<TfSnpModel> | AsbTableDisplayedColumns<ClSnpModel> = [
        "name",
        "effectSizeRef",
        "effectSizeAlt",
        "pValueRef",
        "pValueAlt",
        "meanBad",
    ];
    private destroy$ = new Subject<void>();
    public tableDisplayedColumns: AsbTableDisplayedColumns<TfSnpModel> | AsbTableDisplayedColumns<ClSnpModel>;
    public tableFormGroup: FormGroup;
    public nonStickyColumnModel: AsbTableColumnModel<Partial<TfSnpModel> | Partial<ClSnpModel>> = {};
    public filteredObjectData: TfSnpModel[] | ClSnpModel[];
    public disabledToolTips: boolean = true;

    originalOrder = ((): number => {
        return 0;
    });

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

    _changeColumns(event: MatSelectChange) {
        this.tableDisplayedColumns = [
            "name",
            ...event.value
        ];
    }

    _applyFilter() {
        this.filteredObjectData =
            this.objectData.filter(s => this.filterData(s, this.tableFormGroup.get("filter").value));

    }
    _clearFilterField() {
        this.tableFormGroup.patchValue({filter: null});
    }

    filterData(row: TfSnpModel | ClSnpModel, search: string) {
        let result = true;
        if (search) {
            result = result &&
                row.name.toLowerCase().indexOf(search.trim().toLowerCase()) !== -1;
        }
        return result;
    }
    _calculateColor(row: TfSnpModel | ClSnpModel) {
        return {"background-color": calculateColor(row.pValueRef, row.pValueAlt)};
    }

    _resetFilters() {
        this.tableDisplayedColumns = this.initialDisplayedColumns;
        this.filteredObjectData = this.objectData;
        this.tableFormGroup.patchValue({
            columns: Object.keys(this.nonStickyColumnModel),
            filter: null,
        });
    }
    _getPaginatorOptions(): number[] {
        return getPaginatorOptions(this.filteredObjectData.length);
    }

    _getTitle(row: ExpSnpModel): string {
        return "Additional statistics" ;
    }
}
