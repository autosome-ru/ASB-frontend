import {
    AfterViewInit,
    Component, ElementRef,
    HostBinding,
    Input,
    TemplateRef, ViewChild,
} from "@angular/core";
import {AsbTableColumnModel, AsbTableDisplayedColumns} from "src/app/models/table.model";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";


@Component({
    selector: "asb-table",
    templateUrl: "./table.component.html",
    styleUrls: ["./table.component.less"],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})

export class AsbTableComponent<T> implements AfterViewInit {
    @HostBinding("class.asb-table")
    private readonly cssClass = true;
    @ViewChild("table", {static: true, read: ElementRef}) tableRef: ElementRef<HTMLTableElement>;
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;

    @Input()
    public columnModel: AsbTableColumnModel<T>;


    @Input()
    public displayedColumns: AsbTableDisplayedColumns<T>;
    public _dataSource: MatTableDataSource<T>;
    @Input()
    set data(value: Array<T>) {
        this._dataSource = new MatTableDataSource<T>(value);
        this._dataSource.sort = this.sort;
        if (this.paginatorOptions) this._dataSource.paginator = this.paginator;
    }

    @HostBinding("class._paginator")
    @Input()
    public paginatorOptions: number[];

    @Input()
    public expandCellContentTemplate: TemplateRef<{row: T}>;


    public _expandedRow: T | null;

    ngAfterViewInit() {
        if (this._dataSource) {
            this._dataSource.sort = this.sort;
            if (this.paginatorOptions) this._dataSource.paginator = this.paginator;
        }
    }

    public _handleRowClick(row: T): void {
        if (this.expandCellContentTemplate) {
            this._expandedRow = this._expandedRow == row ? null : row;
        }
    }
}
