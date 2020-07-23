import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input, OnDestroy,
    OnInit,
    Output,
    ViewChild
} from "@angular/core";

import {AsbTableColumnModel, AsbTableDisplayedColumns} from "src/app/models/table.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSelectChange} from "@angular/material/select";
import {getPaginatorOptions} from "../../../helpers/check-functions.helper";
import {AsbTableComponent} from "../../helpers/table-template/table.component";
import {Subscription} from "rxjs";


@Component({
    selector: "asb-statistics",
    templateUrl: "./statistics.component.html",
    styleUrls: ["../snp-page.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AsbStatisticsComponent<T> implements OnInit, OnDestroy {
    @ViewChild("tableViewTFCL", {static: true})
    public tableView: AsbTableComponent<T>;

    @Input()
    public objectData: T[];

    @Input()
    public tableColumnModel: AsbTableColumnModel<T>;

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
    private subscriptions = new Subscription();



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
        this.subscriptions.add(
                this.tableFormGroup.get('filter').valueChanges.subscribe(
                (s) => this._applyFilter(s)
            )
        )

    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    filterData(data: T[], search: string): T[] {
        return data && data.filter(row => {
            let result = true;
            if (search) {
                result = result && Object.keys(row).some(key => {
                    if (!this.tableDisplayedColumns.some(s => s == key)) {
                        return false
                    }
                    const converter = (this.tableColumnModel[key] && this.tableColumnModel[key].valueConverter)
                        || (v => String(v));
                    if (!row[key]) {
                        return false
                    }
                    return converter(row[key]).toLowerCase().indexOf(search.toLowerCase().trim()) !== -1;
                });
            }
            return result;
        });
    }

    _changeColumns(event: MatSelectChange) {
        this.tableDisplayedColumns = [
            "name",
            ...event.value
        ];
    }

    _applyFilter(s?: string) {
        let search: string
        search = s ? s : this.tableFormGroup.get("filter").value
        this.filteredObjectData = this.filterData(this.objectData, search);

    }
    _clearFilterField() {
        this.tableFormGroup.patchValue({filter: null});
    }

    _resetFilters() {
        this.tableDisplayedColumns = this.initialDisplayedColumns;
        this.filteredObjectData = this.objectData;
        this.tableFormGroup.patchValue({
            columns: this.initialDisplayedColumns.filter(s => s !== "name"),
            filter: null
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
