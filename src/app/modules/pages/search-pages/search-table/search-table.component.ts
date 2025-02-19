import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    HostBinding,
    Input,
    OnInit, Output,
    TemplateRef,
    ViewChild, ViewEncapsulation
} from "@angular/core";
import {ActivatedRoute,  Router} from "@angular/router";
import {ClSnpCutModel, SnpSearchModel, TfSnpCutModel} from "../../../../models/data.model";
import {AsbServerSideModel, AsbTableColumnModel, AsbTableDisplayedColumns} from "../../../../models/table.model";
import {SearchParamsModel, SearchResultsModel} from "../../../../models/search-query.model";
import {MatPaginator} from "@angular/material/paginator";
import {baseToColors} from "../../../../helpers/helper/colors.helper";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AsbServerTableComponent} from "../../../shared/table-template/server-side/table-server.component";
import {SortDirection} from "@angular/material/sort";
import {ReleaseModel} from "../../../../models/releases.model";
import {AppState} from "../../../../store/reducer/adastra";
import {Store} from "@ngrx/store";
import * as fromSelectors from "src/app/store/selector/adastra";



@Component({
    selector: "asb-search-table",
    templateUrl: "./search-table.component.html",
    styleUrls: ["../search-page.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SearchPageTableComponent implements OnInit {
    @ViewChild("tableView", {static: true})
    public tableView: AsbServerTableComponent<SnpSearchModel>;

    @ViewChild('fdrViewTemplate', {static: true})
    private fdrViewTemplate: TemplateRef<{value: number}>;

    @ViewChild("starViewTemplate", {static: true})
    public starViewTemplate: TemplateRef<{value: boolean}>;

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
    public isAdvanced: boolean;

    @Input()
    public paginator: MatPaginator;

    @Input()
    public dataChanged: boolean;

    @Input()
    public initialSort: {direction: SortDirection, active: string};

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
    release$: Observable<ReleaseModel>;



    constructor(private router: Router,
                private route: ActivatedRoute,
                private store: Store<AppState>
                ) {}

    ngOnInit() {
        this.columnModel = {
            hasConcordance: {
                view: '',
                isDesc: true,
                columnTemplate: this.starViewTemplate,
                disabledSort: true,
                isSticky: true
            },
            pos: {
                view: "Genome position",
                columnTemplate: this.genomePositionViewTemplate,
                disabledSort: true
            },
            rsId: {view: "rs ID"},

        };

        this.release$ = this.store.select(fromSelectors.selectCurrentRelease);
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
        this.displayedColumns.push("hasConcordance")
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
                        columnTemplate: this.fdrViewTemplate
                    };
                    result[convertTfNameToValue(s, "Alt")] = {
                        view: convertNameToView(s, "Alt"),
                        columnTemplate: this.fdrViewTemplate
                    };
                });
        }
        if (params.cl) {
            params.cl.split("@").forEach(
                s => {
                    result[convertClNameToValue(s, "Ref")] = {
                        view: convertNameToView(s, "Ref"),
                        columnTemplate: this.fdrViewTemplate
                    };
                    result[convertClNameToValue(s, "Alt")] = {
                        view: convertNameToView(s, "Alt"),
                        columnTemplate: this.fdrViewTemplate
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
            params.cl.split("@").forEach(
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
            params.cl.split("@").forEach(
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
