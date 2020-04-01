import {AfterViewInit, Component, HostBinding, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {ClSnpCutModel, SnpGenPosModel, SnpSearchModel, TfSnpCutModel} from "../../models/data.model";
import {AppState} from "../../store/reducer";
import * as fromSelectors from "src/app/store/selector";
import {Store} from "@ngrx/store";
import {AsbTableColumnModel, AsbTableDisplayedColumns} from "../../models/table.model";
import {AsbTableComponent} from "../helpers/table-template/table.component";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {map} from "rxjs/operators";
import {MatButtonToggleChange} from "@angular/material/button-toggle";
import {SearchParamsModel, SearchResultsModel} from "../../models/searchQueryModel";




@Component({
  selector: "asb-search-page",
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.less"]
})
export class SearchPageComponent implements OnInit, AfterViewInit {
    @ViewChild("tableView", {static: true})
    public tableView: AsbTableComponent<SnpSearchModel>;

    @ViewChild(MatPaginator, {static: false})
    public paginator: MatPaginator;

    @ViewChild("manyValuesViewTemplate")
    public manyTransFactorsViewTemplate: TemplateRef<{value: TfSnpCutModel[]}>;

    @ViewChild("genomePositionViewTemplate")
    public genomePositionViewTemplate: TemplateRef<{value: SnpGenPosModel}>;

    @ViewChild("manyCellTypesViewTemplate")
    public manyCellTypesViewTemplate: TemplateRef<{value: ClSnpCutModel[]}>;

    @HostBinding("class.search-page")
    private readonly cssClass = true;

    public searchSnpResults$: Observable<SearchResultsModel>;
    public filteredSnpResults$: Observable<SnpSearchModel[]>;

    public searchSnpResultsLoading$: Observable<boolean>;

    public additionalColumns: {
        dataAccessor: (data: SnpSearchModel[]) => any[]
        displayedColumns: AsbTableDisplayedColumns<any>,
        columnModel: AsbTableColumnModel<any>
    } = null;

    isAdvancedSearch: boolean;

    public columnModel: AsbTableColumnModel<SnpSearchModel>;
    public displayedColumns: AsbTableDisplayedColumns<SnpSearchModel>;
    public pageSize: number;
    public initialGroupValue: "list" | "card";

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>,
                private router: Router,
                private titleService: Title) {}
    ngOnInit() {
        this.titleService.setTitle(this.route.snapshot.data.title);

        this.isAdvancedSearch = !this.router.isActive("/search/simple", false);
        if (this.route.snapshot.queryParams.rs ||
            (this.route.snapshot.queryParams.pos &&
                this.route.snapshot.queryParams.pos.match(/^\d*$/))) {
            this.initialGroupValue = "card";
            this.pageSize = 3;
        } else {
            this.initialGroupValue = "list";
            this.pageSize = 10;
        }

        this.searchSnpResults$ = this.store.select(fromSelectors.selectCurrentSearchResults);
        this.filteredSnpResults$ = this.searchSnpResults$.pipe(map(a => a.results.filter(
            (_, index) =>
                index < this.pageSize && index >= 0)));
        this.searchSnpResultsLoading$ = this.store.select(fromSelectors.selectCurrentSearchResultsLoading);
    }

    ngAfterViewInit() {
        this.displayedColumns = [
            "genPos",
            "rsId",
        ];
        this.columnModel = {
            genPos: {
                view: "Genome position",
                columnTemplate: this.genomePositionViewTemplate,
                disabledSort: true
            },
            rsId: {view: "rs ID"},
        };
        if (!this.isAdvancedSearch || (this.isAdvancedSearch &&
            !this.route.snapshot.queryParams.tf &&
            !this.route.snapshot.queryParams.cl)
        ) {
            this.columnModel = {
                ...this.columnModel,
                transFactors: {
                    view: "Top 5 TFs",
                    columnTemplate: this.manyTransFactorsViewTemplate, disabledSort: true
                },
                cellLines: {
                    view: "Top 3 cell types",
                    columnTemplate: this.manyCellTypesViewTemplate, disabledSort: true
                },
            };
            this.displayedColumns = [
                ...this.displayedColumns,
                "transFactors",
                "cellLines",
            ];
        } else {
            this.additionalColumns = {
                displayedColumns: this.paramsToDisplayedColumns(),
                columnModel: this.paramsToColumnModel(),
                dataAccessor: this.paramsToData
            };
        }
    }

    _navigateToSnp({rsId: id, alt: base}: {rsId: string, alt: string}): void {
        this.router.navigate(["snps/" + id + "/" + base]);
    }

    getPhrase(searchResults: SearchResultsModel, loading: boolean): string {
        if (loading) {
            return "Searching...";
        }
        if (!searchResults.total) {
            return "No results found";
        }
        switch (searchResults.total) {
            case 0: {
                return "No results found";
            }
            case 1: {
                return "1 result";
            }
            default: {
                return `${searchResults.total} results` +
                    (searchResults.total !== searchResults.results.length ?
                    "\nToo many to display. Use get in tsv option" : "");
            }
        }
    }

    _handleTableRowClick(row: SnpSearchModel) {
        this._navigateToSnp({rsId: row.rsId, alt: row.altBase});
    }

    _handlePageChange(page: PageEvent) {
        this._filterSnpResults(page.pageSize, page.pageIndex);
    }

    _filterSnpResults(pageSize: number, pageIndex: number): void {
        this.filteredSnpResults$ = this.searchSnpResults$.pipe(map(a => a.results.filter(
            (element, index) =>
                index < pageSize * (pageIndex + 1) && index >= pageSize * pageIndex)));
    }

    _groupToggled(event: MatButtonToggleChange) {
        if (event.value === "list") {
            this.pageSize = 10;
        } else {
            this.pageSize = 3;
        }
        if (this.paginator) this.paginator.firstPage();
        this._filterSnpResults(this.pageSize,
            this.paginator ? this.paginator.pageIndex : 0);

    }

    private paramsToColumnModel(): any {
        return convertQueryParamsToColumnModel(this.route.snapshot.queryParams);
    }

    private paramsToDisplayedColumns(): string[] {
        return convertQueryParamsToDisplayedColumns(this.route.snapshot.queryParams);
    }

    private paramsToData(data: SnpSearchModel[]): any[] {
        const params = this.route.snapshot.queryParams;
        return data.map(s => {
            const result = {};
            if (params.tf) {
                params.tf.split(",").forEach(
                    p => {
                        result[p + "_p_val_alt"] =
                            s.transFactors.filter(f => f === p)[0].pValueAlt;
                        result[p + "_p_val_ref"] =
                            s.transFactors.filter(f => f === p)[0].pValueRef;
                    });
            }
            if (params.cl) {
                params.cl.split(",").forEach(
                    p => {
                        result[p + "_p_val_alt"] =
                            s.cellLines.filter(f => f === p)[0].pValueAlt;
                        result[p + "_p_val_ref"] =
                            s.cellLines.filter(f => f === p)[0].pValueRef;
                    });
            }
            return result;
        });
    }
}

function convertQueryParamsToDisplayedColumns(params: SearchParamsModel): string[] {
    const result: string[] = [];
    if (params.cl) {
        params.cl.split(",").forEach(
            s => {
                result.push(s + "_p_val_ref");
                result.push(s + "_p_val_alt");
            });
    }
    if (params.tf) {
        params.tf.split(",").forEach(
            s => {
                result.push(s + "_p_val_ref");
                result.push(s + "_p_val_alt");
            });
    }
    return result;
}
function convertQueryParamsToColumnModel(params: SearchParamsModel): any {
    const result = {};
    if (params.cl) {
        params.cl.split(",").forEach(
            s => {
                result[s + "_p_val_ref"] = {view: s + " -log10 FDR Ref"};
                result[s + "_p_val_alt"] = {view: s + " -log10 FDR Alt"};
            });
    }
    if (params.tf) {
        params.tf.split(",").forEach(
            s => {
                result[s + "_p_val_ref"] = {view: s + " -log10 FDR Ref"};
                result[s + "_p_val_alt"] = {view: s + " -log10 FDR Alt"};
            });
    }
    return result;
}
