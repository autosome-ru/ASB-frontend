import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild
} from "@angular/core";

import {AsbTableColumnModel, AsbTableDisplayedColumns} from "src/app/models/table.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSelectChange} from "@angular/material/select";
import {getPaginatorOptions} from "../../../helpers/check-functions.helper";
import {AsbTableComponent} from "../../helpers/table-template/table.component";


@Component({
    selector: "asb-statistics",
    templateUrl: "./statistics.component.html",
    styleUrls: ["../snp-page.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AsbStatisticsComponent<T> implements OnInit {
    @ViewChild("tableViewTFCL", {static: true})
    public tableView: AsbTableComponent<T>;

    @Input()
    public objectData: T[];

    @Input()
    public tableColumnModel: AsbTableColumnModel<T>;

    @Input()
    public searchFunc: ((data: T, search: string) => boolean);

    @Input()
    private readonly initialDisplayedColumns: AsbTableDisplayedColumns<T>;
    @Input()
    action: (row: T) => boolean

    @Input()
    public readonly snpName: (row: T) => string;

    @Output()
    private downloadSnpInfo = new EventEmitter<{
        columns: string[],
        filter: string,
    }>();

    public tableDisplayedColumns: AsbTableDisplayedColumns<T>;
    public tableFormGroup: FormGroup;
    public nonStickyColumnModel: Partial<AsbTableColumnModel<Partial<T>>>;
    public filteredObjectData: T[];

    originalOrder = ((): number => {
        return 0;
    });
    @Output()
    actionClicked = new EventEmitter<T>();



    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.tableDisplayedColumns = this.initialDisplayedColumns;
        this.filteredObjectData = this.objectData;
        if (!this.nonStickyColumnModel) this.nonStickyColumnModel = {};
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

    filterData(row: T, search: string) {
        let result = true;
        if (search && this.searchFunc) {
            result = this.searchFunc(row, search);
        }
        return result;
    }

    _resetFilters() {
        this.tableDisplayedColumns = this.initialDisplayedColumns;
        this.filteredObjectData = this.objectData;
        this.tableFormGroup.patchValue({
            columns: this.initialDisplayedColumns.filter(s => s !== "name"),
            filter: null,
        });
    }
    _getPaginatorOptions(): number[] {
        return getPaginatorOptions(this.filteredObjectData.length);
    }


    _getSnpInfoCsv() {
        this.downloadSnpInfo.emit({
            columns: [
                "name",
                ...this.tableFormGroup.value.columns],
            filter: this.tableFormGroup.value.filter,
        });
    }
}
