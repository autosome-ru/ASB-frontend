import {
    AfterViewInit, ChangeDetectionStrategy,
    Component, ElementRef, EventEmitter,
    HostBinding,
    Input, OnChanges, OnDestroy, Output, SimpleChanges,
    TemplateRef, ViewChild,
} from "@angular/core";
import {AsbTableColumnModel, AsbTableDisplayedColumns} from "src/app/models/table.model";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {AsbPopoverComponent} from "../popover-template/popover.component";


@Component({
    selector: "asb-table",
    templateUrl: "./table.component.html",
    styleUrls: ["./table.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    // animations: [
    //     trigger("detailExpand", [
    //         state("collapsed, void", style({height: "0px", minHeight: "0", display: "none"})),
    //         state("expanded", style({height: "*"})),
    //         transition("expanded <=> collapsed",
    //             animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")),
    //         transition("expanded <=> void",
    //             animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)"))
    //     ]),
    // ],
})

export class AsbTableComponent<T> implements AfterViewInit, OnChanges, OnDestroy {
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
    public isEmpty: boolean;

    @Input()
    public getTitle: (row: T) => string = null;

    @Input()
    public popoverContentTemplate: TemplateRef<{row: T}> = null ;

    @Input()
    public clickableRow: boolean = false;

    @Input()
    public displayedColumns: AsbTableDisplayedColumns<T>;

    public _dataSource: MatTableDataSource<T>;
    public popoverRow: T;


    @Input()
    private sortData: ((data: T[], sort: MatSort) => T[]);

    public initialValue: T[];

    @Input()
    set data(value: T[]) {
        this._dataSource = new MatTableDataSource<T>(value);
        this._dataSource.sort = this.sort;
        this.initialValue = value
        if (this.sortData) {
            this._dataSource.sortData = ((data, sort) =>
                sort.active ? this.sortData(data, sort) : this.initialValue)
        }
        if (this.paginatorOptions) this._dataSource.paginator = this.paginator;
        if (this.externalPaginator && !this.paginatorOptions) this._dataSource.paginator = this.externalPaginator;
    }

    @HostBinding("class._paginator")
    @Input()
    public paginatorOptions: number[];

    @Input()
    public action: (row: T) => boolean

    @Input()
    public expandCellContentTemplate: TemplateRef<{row: T}>;


    public _expandedRow: T | null;

    @Output()
    public rowClickEmitter = new EventEmitter<T>();
    @Output()
    actionClicked = new EventEmitter<T>();


    ngAfterViewInit() {
        if (this._dataSource) {
            this._dataSource.sort = this.sort;
            if (this.sortData) {
                this._dataSource.sortData = ((data, sort) =>
                    sort.direction ? this.sortData(data, sort) : this.initialValue)
            }
            if (this.paginatorOptions) this._dataSource.paginator = this.paginator;
        }
    }
    ngOnChanges(changes: SimpleChanges) {
        if (changes["externalPaginator"] && this.externalPaginator) {
            if (this.externalPaginator && !this.paginatorOptions) this._dataSource.paginator = this.externalPaginator;
        }
    }

    ngOnDestroy() {
        if (this.popover.opened) {
            this.popover.close();
        }
    }
    public _handleRowClick(row: T): void {
        this.rowClickEmitter.emit(row);
        if (this.popoverContentTemplate) {
            this.popover.open();
            this.popover.title = this.getTitle ? this.getTitle(row) : null;
            this.popoverRow = row;
        }
    }

    _onAdditionalStatisticsClose(): void {
        this.popoverRow = null;
    }

    getDisplayedColumns(): string[] {
        const result = []
        result.push(...this.displayedColumns);
        if (this.action) {
            result.push("__action__")
        }
        return result
    }

}


