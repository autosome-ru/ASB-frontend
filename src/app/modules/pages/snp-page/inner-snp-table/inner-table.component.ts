import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from "@angular/core";
import {ExpSnpModel} from "../../../../models/data.model";
import {AsbTableColumnModel, AsbTableDisplayedColumns} from "../../../../models/table.model";
import {checkIfNumberOrFrac, getPaginatorOptions} from "../../../../helpers/helper/check-functions.helper";
import {SortDirection} from "@angular/material/sort";

@Component({
    selector: "asb-inner-table",
    templateUrl: "./inner-table.component.html",
    styleUrls: ["./inner-table.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class InnerTableComponent implements OnInit {
    @ViewChild("alignTemplate", {static: true})
    public expViewTemplate: TemplateRef<{value: string}>;
    @ViewChild('fdrViewTemplate', {static: true})
    private fdrViewTemplate: TemplateRef<{value: number}>;
    @Input()
    innerTableData: ExpSnpModel[];

    @Input()
    isCl: boolean;

    @Input()
    sortColumn: 'ref' | 'alt' | '';

    public displayedColumns: AsbTableDisplayedColumns<ExpSnpModel>;
    public initialSorting: {active: string; direction: SortDirection};
    public columnModel: AsbTableColumnModel<ExpSnpModel>;
    public sortingDataAccessor: ((data: ExpSnpModel, id: string) => string | number) = (
        (data: ExpSnpModel, id: string) => typeof data[id] === "string" ?
            checkIfNumberOrFrac(data[id]) : data[id]
    );




    constructor() { }

    ngOnInit(): void {
        this.columnModel = {
            bad: {view: "Estimated BAD", valueConverter: v => v},
            refReadCount: {view: "Ref read counts", valueConverter: v => "" + v, isDesc: true},
            altReadCount: {view: "Alt read counts", valueConverter: v => "" + v, isDesc: true},
            expId: {view: "GTRD experiment ID", columnTemplate: this.expViewTemplate},
            clName: {view: "Cell type", valueConverter: v => "" + v},
            tfName: {view: "Uniprot ID", valueConverter: v => "" + v},
            rawPValueAlt: {view: "P-value Alt", columnTemplate: this.fdrViewTemplate},
            rawPValueRef: {view: "P-value Ref", columnTemplate: this.fdrViewTemplate}
        };
        if (this.isCl) {
            this.displayedColumns = ["expId", "tfName", "refReadCount",
                "altReadCount", "bad", "rawPValueRef", "rawPValueAlt"];

        } else {
           this.displayedColumns = ["expId", "clName", "refReadCount",
                "altReadCount", "bad", "rawPValueRef", "rawPValueAlt"];
        }
        this.initialSorting = {direction: "asc",
            active: this.sortColumn == 'ref' ? "rawPValueRef" : "rawPValueAlt"};
    }

    _getPaginatorOptions(): number[] {
        return getPaginatorOptions(this.innerTableData.length);
    }

}
