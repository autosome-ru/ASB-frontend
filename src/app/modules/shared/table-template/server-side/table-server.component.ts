import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, ElementRef, EventEmitter,
    HostBinding,
    Input, OnChanges, OnDestroy, Output, SimpleChanges,
    TemplateRef, ViewChild, ViewEncapsulation,
} from "@angular/core";
import {AsbServerSideModel, AsbTableColumnModel, AsbTableDisplayedColumns} from "src/app/models/table.model";
import {MatSort, SortDirection} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {merge, Observable, Subscription} from "rxjs";
import {AsbBackendDataSource} from "./server-side-table.component";
import {tap} from "rxjs/operators";
import {AsbPopoverComponent} from "../../popover-template/popover.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
    selector: "asb-table-server",
    templateUrl: "./table-server.component.html",
    styleUrls: ["../mat-table/table.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})

export class AsbServerTableComponent<T> implements OnChanges, OnDestroy {
    @HostBinding("class.asb-table")
    private readonly cssClass = true;
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
    public clickableRow = false;

    @Input()
    public displayedColumns: AsbTableDisplayedColumns<T>;

    public _dataSource: AsbBackendDataSource<T>;
    public popoverRow: T;
    private subscriptionMade = false;

    @Input()
    set data(value: Observable<T[]>) {
        this._dataSource = new AsbBackendDataSource(value);
    }

    @Input()
    public initialSort: {direction: SortDirection, active: string};

    @Input()
    public dataLoading: boolean;

    @Input()
    public paginatorOptions: number[];
    @Input()
    public paginatorLength: number;
    @Input()
    public paginatorPageSize: number | null;

    @Input()
    public expandCellContentTemplate: TemplateRef<{row: T}>;

    private subscriptions: Subscription = new Subscription();
    public _expandedRow: T | null;

    @Output()
    private rowClickEmitter = new EventEmitter<T>();

    @Output()
    private tableChangesEmitter = new EventEmitter<AsbServerSideModel>();

    constructor(private ref: ChangeDetectorRef, public dialog: MatDialog) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.paginatorLength && this._dataSource && this.paginatorLength) {
            this.ref.detectChanges();
            this.addSubscriptions();
        }
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    public _handleRowClick(row: T): void {
        if (this.getTitle && this.getTitle(row)) {
            this.dialog.open(AsbPopoverComponent, {
                autoFocus: false,
                panelClass: "custom-dialog-container",
                data: {
                    title: this.getTitle(row),
                    template: this.popoverContentTemplate,
                    templateContext: {row}
                }
            });
        } else {
            this.rowClickEmitter.emit(row);
        }
    }

    public emitChanges(paginator: MatPaginator) {
        this.tableChangesEmitter.emit({
            pageIndex: paginator.pageIndex,
            pageSize: paginator.pageSize,
            active: this.sort.active,
            direction: this.sort.direction
        });
    }

    private addSubscriptions() {
        if (!this.subscriptionMade && this.paginatorLength) {
            this.subscriptions.add(
                merge(this.sort.sortChange, this.paginator.page).pipe(
                    tap(() => this.emitChanges(this.paginator))).subscribe()
            );
            this.subscriptionMade = true;
        }
    }
}


