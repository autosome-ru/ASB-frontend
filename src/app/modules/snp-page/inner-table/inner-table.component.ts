import {AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {ExpSnpModel} from "../../../models/data.model";
import {AsbTableColumnModel, AsbTableDisplayedColumns} from "../../../models/table.model";
import {getPaginatorOptions} from "../../../helpers/check-functions.helper";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
    selector: "asb-inner-table",
    templateUrl: "./inner-table.component.html",
    styleUrls: ["./inner-table.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InnerTableComponent implements OnInit, AfterViewInit {

    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild("sort2", {static: false}) sort: MatSort;

    @ViewChild("alignTemplate", {static: true})
    public alignViewTemplate: TemplateRef<{value: number}>;

    constructor() { }

    public _dataSource: MatTableDataSource<ExpSnpModel>;

    public columnModel: AsbTableColumnModel<ExpSnpModel>;
    public displayedColumns: AsbTableDisplayedColumns<ExpSnpModel> = [
        "refReadCount",
        "altReadCount",
        "align",
        "clName",
        "tfName",
        "bad",
    ];

    @Input()
    set innerTableData(value:  ExpSnpModel[]) {
        this._dataSource = new MatTableDataSource<ExpSnpModel>(value);
        this._dataSource.sort = this.sort;
        // this._dataSource.sortingDataAccessor = this.sortingDataAccessor;
        this._dataSource.paginator = this.paginator;
    }

    ngOnInit(): void {
        this.columnModel = {
            bad: {view: "BAD", valueConverter: v => v},
            refReadCount: {view: "Ref read counts", valueConverter: v => "" + v},
            altReadCount: {view: "Alt read counts", valueConverter: v => "" + v},
            align: {view: "GTRD align", columnTemplate: this.alignViewTemplate},
            clName: {view: "Cell type", valueConverter: v => "" + v},
            tfName: {view: "Uniprot ID", valueConverter: v => "" + v},
        };
    }

    ngAfterViewInit() {
        if (this._dataSource) {
            this._dataSource.sort = this.sort;
            // this._dataSource.sortingDataAccessor = this.sortingDataAccessor;
            this._dataSource.paginator = this.paginator;
        }
    }

    _getPaginatorOptions(): number[] {
        return this._dataSource ? getPaginatorOptions(this._dataSource.data.length) : [];
    }
}
