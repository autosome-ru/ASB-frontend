import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input, OnDestroy,
    OnInit,
    Output, TemplateRef,
    ViewChild, ViewEncapsulation
} from "@angular/core";

import {AsbTableColumnModel, AsbTableDisplayedColumns} from "src/app/models/table.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSelectChange} from "@angular/material/select";
import {getPaginatorOptions} from "../../../../helpers/helper/check-functions.helper";
import {AsbTableComponent} from "../../../shared/table-template/mat-table/table.component";
import {Subscription} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {getTextByStepNameAdastra} from "../../../../helpers/text-helpers/tour.adastra.helper";


@Component({
    selector: "asb-statistics",
    templateUrl: "./statistics.component.html",
    styleUrls: ["../snp-page.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class AsbStatisticsComponent<T> implements OnInit, OnDestroy {
    @ViewChild("tableViewTFCL", {static: true})
    public tableView: AsbTableComponent<T>;

    @Input()
    public objectData: T[];

    @Input()
    public isCl: boolean;

    @Input()
    public tableColumnModel: AsbTableColumnModel<T>;

    @Input()
    private readonly initialDisplayedColumns: AsbTableDisplayedColumns<T>;
    @Input()
    actionFilter: (row: T) => boolean;

    @Input()
    public actionTemplate: TemplateRef<{value: T}>;

    @Input()
    public readonly getSnpName: (row: T) => string;

    @Input()
    sortData: ((data: T[], sort: MatSort) => T[]);

    @Output()
    private downloadSnpInfo = new EventEmitter<{
        columns: string[],
        filter: string,
    }>();
    @Output()
    actionClicked = new EventEmitter<T>();

    public tableDisplayedColumns: AsbTableDisplayedColumns<T>;
    public tableFormGroup: FormGroup;
    public nonStickyColumnModel: Partial<AsbTableColumnModel<Partial<T>>> = {};
    public filteredObjectData: T[];

    originalOrder = ((): number => {
        return 0;
    });

    private subscriptions = new Subscription();
    private stickyColumn: string;
    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.tableDisplayedColumns = this.initialDisplayedColumns;
        this.filteredObjectData = this.objectData;
        Object.keys(this.tableColumnModel).forEach(
            key => this.tableColumnModel[key as keyof AsbTableColumnModel<T> ].isSticky ?
                this.stickyColumn = key
                : this.nonStickyColumnModel[key] = this.tableColumnModel[key]
        );

        this.tableFormGroup = this.formBuilder.group({
            columns: [this.initialDisplayedColumns.filter(s => !this.tableColumnModel[s].isSticky), null],
            filter: null,
        });
        this.subscriptions.add(
                this.tableFormGroup.get('filter').valueChanges.subscribe(
                (s) => this._applyFilter(s)
            )
        );

    }

    getTextByStepName(step: string) {
        return getTextByStepNameAdastra(step);
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
                        return false;
                    }
                    const converter = (this.tableColumnModel[key] && this.tableColumnModel[key].valueConverter)
                        || (v => String(v));
                    if (!row[key]) {
                        return false;
                    }
                    return converter(row[key]).toLowerCase().indexOf(search.toLowerCase().trim()) !== -1;
                });
            }
            return result;
        });
    }

    _changeColumns(event: MatSelectChange) {
        this.tableDisplayedColumns = [
            this.stickyColumn,
            ...event.value
        ];
    }

    _applyFilter(s?: string) {
        let search: string;
        search = s ? s : this.tableFormGroup.get("filter").value;
        this.filteredObjectData = this.filterData(this.objectData, search);

    }
    _clearFilterField() {
        this.tableFormGroup.patchValue({filter: null});
    }

    _resetFilters() {
        this.tableDisplayedColumns = this.initialDisplayedColumns;
        this.filteredObjectData = this.objectData;
        this.tableFormGroup.patchValue({
            columns: this.initialDisplayedColumns.filter(s => s !== this.stickyColumn),
            filter: null
        });
    }
    _getPaginatorOptions(): number[] {
        return getPaginatorOptions(this.filteredObjectData.length);
    }


    _getSnpInfoCsv() {
        this.downloadSnpInfo.emit({
            columns: [
                this.stickyColumn,
                ...this.tableFormGroup.value.columns],
            filter: this.tableFormGroup.value.filter,
        });
    }
}
