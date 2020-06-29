import {
    AfterViewInit, ChangeDetectionStrategy,
    Component, ElementRef, EventEmitter,
    HostBinding,
    Input, OnChanges, OnDestroy, Output, SimpleChanges,
    TemplateRef, ViewChild,
} from "@angular/core";
import {AsbTableColumnModel, AsbTableDisplayedColumns} from "src/app/models/table.model";
import {MatSort, Sort, SortDirection} from "@angular/material/sort";
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
    public getTitle: (row: T) => string = null;

    @Input()
    public popoverContentTemplate: TemplateRef<{row: T}> = null ;

    @Input()
    public clickableRow: boolean = false;

    @Input()
    public displayedColumns: AsbTableDisplayedColumns<T>;

    public _dataSource: MatTableDataSource<T>;
    public sortDirection: SortDirection = "";
    public sortingDataAccessor: ((data: T, sortHeaderId: string) => string | number) =
        ((data: T, sortHeaderId: string) => data[sortHeaderId] !== null ? data[sortHeaderId] :
            sortHeaderId == 'motifConcordance' ? (this.sortDirection !== "desc" ? 'zzzzz' : '00000') : 1000 * (this.sortDirection !== "desc" ? 1 : -1));
    public popoverRow: T;
    // TODO remove sortingDataAccessor
    // sortData: ((data: T[], sort: MatSort) => T[])
    // return this.compareItems(valueA, valueB) * (direction == 'asc' ? 1 : -1);
    //
    // private compareItems(itemA: any, itemB: any): number {
    //     let retVal: number = 0;
    //     if (itemA && itemB) {
    //         if (itemA > itemB) retVal = 1;
    //         else if (itemA < itemB) retVal = -1;
    //     }
    //     else if (itemA) retVal = 1;
    //     else if (itemB) retVal = -1;
    //     return retVal;
    // }
    @Input()
    set data(value: Array<T>) {
        this._dataSource = new MatTableDataSource<T>(value);
        this._dataSource.sort = this.sort;
        this._dataSource.sortingDataAccessor = this.sortingDataAccessor;
        if (this.paginatorOptions) this._dataSource.paginator = this.paginator;
        if (this.externalPaginator && !this.paginatorOptions) this._dataSource.paginator = this.externalPaginator;
    }

    @HostBinding("class._paginator")
    @Input()
    public paginatorOptions: number[];

    @Input()
    public expandCellContentTemplate: TemplateRef<{row: T}>;


    public _expandedRow: T | null;

    @Output()
    public rowClickEmitter = new EventEmitter<T>();

    ngAfterViewInit() {
        if (this._dataSource) {
            this._dataSource.sort = this.sort;
            this._dataSource.sortingDataAccessor = this.sortingDataAccessor;
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
        // if (this.expandCellContentTemplate) {
        //     if (row != undefined) {
        //         this._expandedRow = this._expandedRow === row ? null : row;
        //     }
        // }
    }

    _onAdditionalStatisticsClose(): void {
        this.popoverRow = null;
    }

    _changeCurrentSortDirection(currentSort: Sort) {
        this.sortDirection = currentSort.direction;
    }
}


