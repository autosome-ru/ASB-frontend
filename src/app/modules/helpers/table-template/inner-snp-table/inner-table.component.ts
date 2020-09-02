import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from "@angular/core";
import {ExpSnpModel} from "../../../../models/data.model";
import {AsbTableColumnModel} from "../../../../models/table.model";
import {checkIfNumberOrFrac, getPaginatorOptions} from "../../../../helpers/helper/check-functions.helper";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
    selector: "asb-inner-table",
    templateUrl: "./inner-table.component.html",
    styleUrls: ["./inner-table.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class InnerTableComponent implements OnInit, AfterViewInit {

    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild("sort2", {static: false}) sort: MatSort;

    @ViewChild("alignTemplate", {static: true})
    public alignViewTemplate: TemplateRef<{value: number}>;

    constructor() { }

    public _dataSource: MatTableDataSource<ExpSnpModel>;

    public columnModel: AsbTableColumnModel<ExpSnpModel>;

    private sortingDataAccessor: ((data: ExpSnpModel, id: string) => string | number) = (
        (data: ExpSnpModel, id: string) => typeof data[id] === "string" ?
            checkIfNumberOrFrac(data[id]) : data[id]
    );

    @Input()
    set innerTableData(value:  ExpSnpModel[]) {
        this._dataSource = new MatTableDataSource<ExpSnpModel>(value);
        this._dataSource.sort = this.sort;
        this._dataSource.sortingDataAccessor = this.sortingDataAccessor;
        this._dataSource.paginator = this.paginator;
    }

    @Input()
    isCl: boolean;

    @Input()
    sortColumn: 'ref' | 'alt' | '';

    ngOnInit(): void {
        this.columnModel = {
            bad: {view: "Estimated BAD", valueConverter: v => v},
            refReadCount: {view: "Ref read counts", valueConverter: v => "" + v},
            altReadCount: {view: "Alt read counts", valueConverter: v => "" + v},
            align: {view: "GTRD align ID", columnTemplate: this.alignViewTemplate},
            clName: {view: "Cell type", valueConverter: v => "" + v},
            tfName: {view: "Uniprot ID", valueConverter: v => "" + v},
            rawPValueAlt: {view: "-log₁₀ P-value Alt", valueConverter: v => v.toFixed(2)},
            rawPValueRef: {view: "-log₁₀ P-value Ref", valueConverter: v => v.toFixed(2)}

        };
    }

    ngAfterViewInit() {
        if (this._dataSource) {
            this._dataSource.sort = this.sort;
            this._dataSource.sortingDataAccessor = this.sortingDataAccessor;
            this._dataSource.paginator = this.paginator;
        }
    }

    _getPaginatorOptions(): number[] {
        return this._dataSource ? getPaginatorOptions(this._dataSource.data.length) : [];
    }

    getDisplayedColumns() {
        if (this.isCl) {
            return ["align", "tfName", "refReadCount",
                "altReadCount", "bad", "rawPValueRef", "rawPValueAlt"]
        } else {
            return  ["align", "clName", "refReadCount",
                "altReadCount", "bad", "rawPValueRef", "rawPValueAlt"]
        }
    }
}
