import {
    AfterViewInit, ChangeDetectionStrategy,
    Component, ElementRef, EventEmitter,
    HostBinding,
    Input, OnChanges, Output, SimpleChanges,
    TemplateRef, ViewChild, ViewEncapsulation,
} from "@angular/core";
import {AsbTableColumnModel, AsbTableDisplayedColumns} from "src/app/models/table.model";
import {MatSort, SortDirection} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {AsbPopoverComponent} from "../../popover-template/popover.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
    selector: "asb-table",
    templateUrl: "./table.component.html",
    styleUrls: ["./table.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})

export class AsbTableComponent<T> implements AfterViewInit, OnChanges {
    @HostBinding("class.asb-table")
    private readonly cssClass = true;
    @ViewChild("table", {static: true, read: ElementRef}) tableRef: ElementRef<HTMLTableElement>;
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild("sort", {static: false}) sort: MatSort;

    constructor(
        public dialog: MatDialog,
    ) {}

    @Input()
    public columnModel: AsbTableColumnModel<T>;

    @Input()
    private sortingDataAccessor: ((data: T, s: string ) => string | number);
    @Input()
    public externalPaginator: MatPaginator;

    @Input()
    public isEmpty: boolean;

    @Input()
    public getTitle: (row: T) => string = null;

    @Input()
    public popoverContentTemplate: TemplateRef<{row: T}> = null ;

    @Input()
    public clickableRow = false;

    @Input()
    public displayedColumns: AsbTableDisplayedColumns<T>;

    public _dataSource: MatTableDataSource<T>;
    public popoverRow: T;


    @Input()
    private sortData: ((data: T[], sort: MatSort) => T[]);

    public initialValue: T[];

    @Input()
    public initialSorting: { active: string; direction: SortDirection };

    @Input()
    set data(value: T[]) {
        this._dataSource = new MatTableDataSource<T>(value);
        this.initialValue = value;
        this.checkDataSource();
        if (this.externalPaginator && !this.paginatorOptions) { this._dataSource.paginator = this.externalPaginator; }
    }

    @Input()
    public paginatorOptions: number[];

    @Input()
    public action: (row: T) => boolean;

    @Input()
    public expandCellContentTemplate: TemplateRef<{row: T}>;


    public _expandedRow: T | null;

    @Output()
    public rowClickEmitter = new EventEmitter<T>();
    @Output()
    actionClicked = new EventEmitter<T>();


    ngAfterViewInit() {
        if (this._dataSource) {
            this.checkDataSource();
        }
    }

    checkDataSource() {
        this._dataSource.sort = this.sort;
        if (this.sortData) {
            this._dataSource.sortData = ((data, sort) =>
                sort.direction ? this.sortData(data, sort) : this.initialValue);
        }
        if (this.sortingDataAccessor) { this._dataSource.sortingDataAccessor = this.sortingDataAccessor; }
        if (this.paginatorOptions) { this._dataSource.paginator = this.paginator; }
    }
    ngOnChanges(changes: SimpleChanges) {
        if (changes.externalPaginator && this.externalPaginator) {
            if (this.externalPaginator && !this.paginatorOptions) { this._dataSource.paginator = this.externalPaginator; }
        }
    }


    public _handleRowClick(row: T): void {
        this.dialog.open(AsbPopoverComponent, {
            autoFocus: false,
            panelClass: "custom-dialog-container",
            data: {
                title: this.getTitle(row),
                template: this.popoverContentTemplate,
                templateContext: {row}
            }
        });
    }


    getDisplayedColumns(): string[] {
        const result = [];
        result.push(...this.displayedColumns);
        if (this.action) {
            result.push("__action__");
        }
        return result;
    }

}


