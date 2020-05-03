import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    HostBinding,
    Input,
    OnInit, Output,
    TemplateRef,
    ViewChild
} from "@angular/core";
import {ActivatedRoute,  Router} from "@angular/router";
import {ClSnpCutModel, SnpSearchModel, TfSnpCutModel} from "../../../models/data.model";
import {AsbServerSideModel, AsbTableColumnModel, AsbTableDisplayedColumns} from "../../../models/table.model";
import {AsbTableComponent} from "../../helpers/table-template/table.component";
import {SearchParamsModel, SearchResultsModel} from "../../../models/searchQueryModel";
import {MatPaginator} from "@angular/material/paginator";
import {baseToColors} from "../../../helpers/colors.helper";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";



@Component({
    selector: "asb-search-table",
    templateUrl: "./search-table.component.html",
    styleUrls: ["../search-page.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageTableComponent implements OnInit {
    @ViewChild("tableView", {static: true})
    public tableView: AsbTableComponent<SnpSearchModel>;

    @ViewChild("manyValuesViewTemplate", {static: true})
    public manyTransFactorsViewTemplate: TemplateRef<{value: TfSnpCutModel[]}>;

    @ViewChild("genomePositionViewTemplate", {static: true})
    public genomePositionViewTemplate: TemplateRef<{row: any, value: any}>;

    @ViewChild("manyCellTypesViewTemplate", {static: true})
    public manyCellTypesViewTemplate: TemplateRef<{value: ClSnpCutModel[]}>;

    @HostBinding("class.search-pages")
    private readonly cssClass = true;

    @Input()
    readonly searchResults$: Observable<SearchResultsModel>;

    @Input()
    public paginator: MatPaginator;

    @Input()
    public dataChanged: boolean;

    @Output()
    private snpClicked = new EventEmitter<{rsId: string, alt: string}>();

    @Output()
    private tableChangeEmitter = new EventEmitter<AsbServerSideModel>();

    public columnModel: AsbTableColumnModel<any>;
    public displayedColumns: AsbTableDisplayedColumns<any> = [
        "pos",
        "rsId",

    ];
    public dataToView: Observable<any[]>;
    colors: any = baseToColors;



    constructor(private router: Router,
                private route: ActivatedRoute,
                ) {}

    ngOnInit() {
        this.columnModel = {
            pos: {
                view: "Genome position",
                columnTemplate: this.genomePositionViewTemplate,
                disabledSort: true
            },
            rsId: {view: "rs ID"},

        };
        if ((!this.router.isActive("/search/simple", false) &&
            !this.route.snapshot.queryParams.tf &&
            !this.route.snapshot.queryParams.cl) ||
            this.router.isActive("/search/simple", false)) {
            this.columnModel = {
                ...this.columnModel,
                transFactors: {
                    view: "Top 5 TFs",
                    columnTemplate: this.manyTransFactorsViewTemplate,
                    disabledSort: true
                },
                cellLines: {
                    view: "Top 3 cell types",
                    columnTemplate: this.manyCellTypesViewTemplate,
                    disabledSort: true
                },
            };
            this.displayedColumns = [
                ...this.displayedColumns,
                "transFactors",
                "cellLines",
            ];
        } else {
            this.displayedColumns = [
                ...this.displayedColumns,
                ...this.paramsToDisplayedColumns(),
            ];
            this.columnModel = {
                ...this.columnModel,
                ...this.paramsToColumnModel(),
            };
        }
        this.dataToView = this.searchResults$.pipe(map(s => s.results.map(e => {
            return {
                ...e,
                ...this.paramsToData(e)
            };
        })));
    }

    _handleTableRowClick(row: SnpSearchModel) {
        this.snpClicked.emit({rsId: row.rsId, alt: row.altBase});
    }

    private paramsToColumnModel(): AsbTableColumnModel<any> {
        const params = this.route.snapshot.queryParams as SearchParamsModel;
        const result = {};
        if (params.tf) {
            params.tf.split(",").forEach(
                s => {
                    result[convertTfNameToValue(s, "Ref")] = {
                        view: convertNameToView(s, "Ref"),
                        valueConverter: v => v || v === 0 ? v.toFixed(2) : "NaN",
                        helpMessage: "-log10 FDR"};
                    result[convertTfNameToValue(s, "Alt")] = {
                        view: convertNameToView(s, "Alt"),
                        valueConverter: v => v || v === 0 ? v.toFixed(2) : "NaN",
                        helpMessage: "-log10 FDR"
                    };
                });
        }
        if (params.cl) {
            params.cl.split(",").forEach(
                s => {
                    result[convertClNameToValue(s, "Ref")] = {
                        view: convertNameToView(s, "Ref"),
                        valueConverter: v => v || v === 0 ? v.toFixed(2) : "NaN",
                        helpMessage: "-log10 FDR"
                    };
                    result[convertClNameToValue(s, "Alt")] = {
                        view: convertNameToView(s, "Alt"),
                        valueConverter: v => v || v === 0 ? v.toFixed(2) : "NaN",
                        helpMessage: "-log10 FDR"
                    };
                });
        }
        return result;
    }

    private paramsToDisplayedColumns(): string[] {
        const params = this.route.snapshot.queryParams as SearchParamsModel;
        const result: string[] = [];
        if (params.tf) {
            params.tf.split(",").forEach(
                s => {
                    result.push(convertTfNameToValue(s, "Ref"));
                    result.push(convertTfNameToValue(s, "Alt"));
                });
        }
        if (params.cl) {
            params.cl.split(",").forEach(
                s => {
                    result.push(convertClNameToValue(s, "Ref"));
                    result.push(convertClNameToValue(s, "Alt"));
                });
        }
        return result;
    }

    private paramsToData(s: SnpSearchModel): any {
        const params = this.route.snapshot.queryParams as SearchParamsModel;
        const result = {};
        if (params.tf) {
            params.tf.split(",").forEach(
                p => {
                    result[convertTfNameToValue(p, "Alt")] =
                        s.transFactors ? s.transFactors.filter(f => f.name === p)[0].pValueAlt : "NaN";
                    result[convertTfNameToValue(p, "Ref")] =
                        s.transFactors ? s.transFactors.filter(f => f.name === p)[0].pValueRef : "NaN";
                });
        }
        if (params.cl) {
            params.cl.split(",").forEach(
                p => {
                    result[convertClNameToValue(p, "Alt")] =
                        s.cellLines ? s.cellLines.filter(f => f.name === p)[0].pValueAlt : "NaN";
                    result[convertClNameToValue(p, "Ref")] =
                        s.cellLines ? s.cellLines.filter(f => f.name === p)[0].pValueRef : "NaN";
                });
        }
        return result;
    }


    _handleTableChanges(change: AsbServerSideModel) {
        this.tableChangeEmitter.emit(change);

    }
}

function convertTfNameToValue(name: string, allele: "Ref" | "Alt"): string {
    return name + "TF" + "PVal" + allele;
}
function convertClNameToValue(name: string, allele: "Ref" | "Alt"): string {
    return name + "CL" + "PVal" + allele;
}
function convertNameToView(name: string, allele: "Ref" | "Alt"): string {
    return `${name} FDR\u00A0${allele}`;
}
