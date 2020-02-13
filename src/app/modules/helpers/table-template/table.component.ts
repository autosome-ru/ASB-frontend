import {
    ChangeDetectionStrategy,
    Component, ElementRef, EventEmitter,
    HostBinding,
    Input,
    Output, TemplateRef, ViewChild,
    ViewEncapsulation
} from "@angular/core";
import {AsbTableColumnModel, AsbTableDisplayedColumns} from "src/app/models/table.model";
import {MatTableDataSource, PageEvent} from "@angular/material";
import {animate, state, style, transition, trigger} from "@angular/animations";


@Component({
    selector: "asb-table",
    templateUrl: "./table.component.html",
    styleUrls: ["./table.component.less"],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger("expand", [
            state("collapsed", style({height: "0px", minHeight: "0"})),
            state("expanded", style({height: "20px"})),
            transition("expanded <=> collapsed", animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")),
        ]),
    ],
})

export class AsbTableComponent<T>  {
    @HostBinding("class.asb-table")
    private readonly cssClass = true;
    @ViewChild("table", {static: true, read: ElementRef}) tableRef: ElementRef<HTMLTableElement>;

    @Input()
    public columnModel: AsbTableColumnModel<T>;

    @Input()
    public stickyColumnModel: AsbTableColumnModel<T>;

    @Input()
    public displayedColumns: AsbTableDisplayedColumns<T>;

    public _dataSource: MatTableDataSource<T>;
    @Input()
    set data(value: Array<T>) {
        this._dataSource = new MatTableDataSource<T>(value);
    }

    @Input()
    public mobile: boolean;

    @Input()
    public emptyContentTemplate: TemplateRef<any>;

    @Input()
    public expandCellContentTemplate: TemplateRef<{row: T}>;

    @Input()
    public paginatorOptions: number[];

    @Input()
    public customContentBottomTemplate: TemplateRef<void>;


    @Input()
    public serverPaginationCount: number;
    @Output()
    public changePage = new EventEmitter<PageEvent>();

    public _expandedRow: T | null;



    public _handleRowClick(row: T): void {
        if (this.expandCellContentTemplate) {
            this._expandedRow = this._expandedRow === row ? null : row;
        }
    }
}
