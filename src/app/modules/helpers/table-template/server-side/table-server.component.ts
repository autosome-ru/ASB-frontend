import {
    AfterViewInit, ChangeDetectionStrategy,
    Component, ElementRef, EventEmitter,
    HostBinding,
    Input, OnChanges, OnDestroy, Output, SimpleChanges,
    TemplateRef, ViewChild,
} from "@angular/core";
import {AsbServerSideModel, AsbTableColumnModel, AsbTableDisplayedColumns} from "src/app/models/table.model";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {AsbPopoverComponent} from "../../popover-template/popover.component";
import {merge, Observable, Subscription} from "rxjs";
import {AsbBackendDataSource} from "./server-side-table.component";
import {tap} from "rxjs/operators";


@Component({
    selector: "asb-table-server",
    templateUrl: "./table-server.component.html",
    styleUrls: ["../table.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AsbServerTableComponent<T> implements AfterViewInit, OnChanges, OnDestroy {
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

    public _dataSource: AsbBackendDataSource<T>;
    public popoverRow: T;

    @Input()
    set data(value: Observable<T[]>) {
        this._dataSource = new AsbBackendDataSource(value);
    }

    @Input()
    public dataLoading: boolean;

    @Input()
    public paginatorOptions: number[];
    @Input()
    public paginatorLength: number;

    @Input()
    public expandCellContentTemplate: TemplateRef<{row: T}>;

    private subscriptions: Subscription = new Subscription();
    public _expandedRow: T | null;

    @Output()
    private rowClickEmitter = new EventEmitter<T>();

    @Output()
    private tableChangesEmitter = new EventEmitter<AsbServerSideModel>();

    ngAfterViewInit() {
        if (this._dataSource) {
            if (this.paginatorOptions) {
                this.addSubscriptions(this.paginator);
            }
            // external paginator already initialized
            if (this.externalPaginator && this.sort) {
                this.addSubscriptions(this.externalPaginator);
            }
        }
    }
    ngOnChanges(changes: SimpleChanges) {
        if (changes["externalPaginator"] && this.externalPaginator) {
            if (this.externalPaginator && this.sort) {
                this.addSubscriptions(this.externalPaginator);
            }
        }
    }

    ngOnDestroy() {
        if (this.popover.opened) {
            this.popover.close();
        }
        this.subscriptions.unsubscribe();
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

    private emitChanges(paginator: MatPaginator) {
        this.tableChangesEmitter.emit({
            pageIndex: paginator.pageIndex,
            pageSize: paginator.pageSize,
            active: this.sort.active,
            direction: this.sort.direction
        });
    }

    private addSubscriptions(paginator: MatPaginator) {

        this.subscriptions.add(
            this.sort.sortChange.subscribe(
                () => paginator.firstPage())
        );
        this.subscriptions.add(
            merge(this.sort.sortChange, paginator.page).pipe(
                tap(() => this.emitChanges(paginator))).subscribe()
        );
    }
}


