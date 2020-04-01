import {
    AfterViewInit, ChangeDetectionStrategy,
    Component, ElementRef, EventEmitter,
    HostBinding,
    Input, OnInit, Output,
    TemplateRef, ViewChild,
} from "@angular/core";
import {AsbTableColumnModel, AsbTableDisplayedColumns} from "src/app/models/table.model";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatSort, Sort, SortDirection} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {AsbPopoverComponent} from "../popover-template/popover.component";


@Component({
    selector: "asb-table",
    templateUrl: "./table.component.html",
    styleUrls: ["./table.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger("detailExpand", [
            state("collapsed, void", style({height: "0px", minHeight: "0", display: "none"})),
            state("expanded", style({height: "*"})),
            transition("expanded <=> collapsed",
                animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")),
            transition("expanded <=> void",
                animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)"))
        ]),
    ],
})

export class AsbTableComponent<T> implements AfterViewInit, OnInit {
    @HostBinding("class.asb-table")
    private readonly cssClass = true;
    @ViewChild("popover", {static: true})
    public popover: AsbPopoverComponent;
    @ViewChild("table", {static: true, read: ElementRef}) tableRef: ElementRef<HTMLTableElement>;
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild("sort1", {static: false}) sort: MatSort;

    @Input()
    public columnModel: AsbTableColumnModel<T>;

    @Input()
    public externalPaginator: MatPaginator;

    @Input()
    public additionalColumns: {
        dataAccessor: (data: T[]) => any[],
        displayedColumns: AsbTableDisplayedColumns<any>,
        columnModel: AsbTableColumnModel<any>
    };
    @Input()
    public colorStyle = null;
    @Input()
    public getTitle: (row: T) => string = null;

    @Input()
    public popoverContentTemplate: TemplateRef<{row: T}> = null ;

    @Input()
    public clickableRow: boolean = false;

    @Input()
    public displayedColumns: AsbTableDisplayedColumns<T>;

    public _dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
    public sortDirection: SortDirection = "";
    public sortingDataAccessor: ((data: T, sortHeaderId: string) => string | number) =
        ((data: T, sortHeaderId: string) => data[sortHeaderId] !== null ? data[sortHeaderId] :
            1000 * (this.sortDirection !== "desc" ? 1 : -1));
    public popoverRow: T;

    @Input()
    data: Array<T>;

    @HostBinding("class._paginator")
    @Input()
    public paginatorOptions: number[];

    @Input()
    public disabledToolTips: boolean;

    @Input()
    public expandCellContentTemplate: TemplateRef<{row: T}>;


    public _expandedRow: T | null;

    @Output()
    public rowClickEmitter = new EventEmitter<T>();

    getDisplayedColumns(): any {
        return this.additionalColumns && this.additionalColumns.displayedColumns ?
            [...this.displayedColumns, ...this.additionalColumns.displayedColumns] :
            this.displayedColumns;
    }

    getColumnModel(): any {
        return this.additionalColumns && this.additionalColumns.columnModel ?
            {...this.columnModel, ...this.additionalColumns.columnModel} :
            this.columnModel;
    }

    ngOnInit() {
        if (this.additionalColumns && this.additionalColumns.dataAccessor) {
            this._dataSource = new MatTableDataSource<any>(
                this.data.map((s, index) => {
                    return {...s, ...this.additionalColumns.dataAccessor(this.data)[index]};
                }));

        } else {
            this._dataSource = new MatTableDataSource<T>(this.data);
        }
        this._dataSource.sort = this.sort;
        this._dataSource.sortingDataAccessor = this.sortingDataAccessor;
        if (this.paginatorOptions) this._dataSource.paginator = this.paginator;
        if (this.externalPaginator && !this.paginatorOptions) this._dataSource.paginator = this.externalPaginator;
    }

    ngAfterViewInit() {
        if (this._dataSource) {
            this._dataSource.sort = this.sort;
            this._dataSource.sortingDataAccessor = this.sortingDataAccessor;
            if (this.paginatorOptions) this._dataSource.paginator = this.paginator;
        }
    }
    public _handleRowClick(row: T): void {
        this.rowClickEmitter.emit(row);
        if (this.popoverContentTemplate) {
            this.popover.open();
            this.popover.title = this.getTitle ? this.getTitle(row) : null;
            this.popoverRow = row;
        }
        // if (this.expandCellContentTemplate) {
        //     if (row != undefined) {
        //         this._expandedRow = this._expandedRow === row ? null : row;
        //     }
        // }
    }

    _onAdditionalStatisticsClose(): void {
        this.popoverRow = null;
    }
    _calculateColor(row: T) {
        return this.colorStyle ? this.colorStyle(row) : null;
    }

    _changeCurrentSortDirection(currentSort: Sort) {
        this.sortDirection = currentSort.direction;
    }

    _getTooltipMessage(helpMessage: string) {
        return helpMessage && this.disabledToolTips ? helpMessage : null;
    }
}


