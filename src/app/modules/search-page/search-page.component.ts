import {AfterViewInit, Component, HostBinding, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {ClSnpCutModel, SnpSearchModel, TfSnpCutModel} from "../../models/data.model";
import {AppState} from "../../store/reducer";
import * as fromSelectors from "src/app/store/selector";
import {Store} from "@ngrx/store";
import {AsbTableColumnModel, AsbTableDisplayedColumns} from "../../models/table.model";
import {AsbTableComponent} from "../helpers/table-template/table.component";

@Component({
  selector: "asb-search-page",
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.less"]
})
export class SearchPageComponent implements OnInit, AfterViewInit {
    @ViewChild("tableView", {static: true})
    public tableView: AsbTableComponent<SnpSearchModel>;

    @ViewChild("manyValuesViewTemplate")
    public manyValuesViewTemplate: TemplateRef<{value: TfSnpCutModel[] | ClSnpCutModel[]}>;

    @HostBinding("class.search-page")
    private readonly cssClass = true;

    public searchSnpResults$: Observable<SnpSearchModel[]>;
    public searchSnpResultsLoading$: Observable<boolean>;

    public columnModel: AsbTableColumnModel<SnpSearchModel>;
    public displayedColumns: AsbTableDisplayedColumns<SnpSearchModel> = [
        "chr",
        "pos",
        "rsId",
        "refBase",
        "altBase",
        "transFactors",
        "cellLines",
    ];


    constructor(private route: ActivatedRoute,
                private store: Store<AppState>,
                private router: Router,
                private titleService: Title) {}
    ngOnInit() {
        this.titleService.setTitle(this.route.snapshot.data.title);

        this.searchSnpResults$ = this.store.select(fromSelectors.selectCurrentSearchResults);
        this.searchSnpResultsLoading$ = this.store.select(fromSelectors.selectCurrentSearchResultsLoading);
    }

    ngAfterViewInit() {
        this.columnModel = {
            chr: {view: "Chromosome", disabledSort: true},
            pos: {view: "Position"},
            rsId: {view: "rs ID"},
            refBase: {view: "ref"},
            altBase: {view: "alt"},
            transFactors: {view: "TFs", columnTemplate: this.manyValuesViewTemplate, disabledSort: true},
            cellLines: {view: "Cell types", columnTemplate: this.manyValuesViewTemplate, disabledSort: true},
        };
    }

    _navigateToSnp({rsId: id, alt: base}: {rsId: string, alt: string}): void {
        this.router.navigate(["snps/" + id + "/" + base]);
    }

    getPhrase(n: number, loading: boolean): string {
        if (loading) {
            return "Searching...";
        }
        switch (n) {
            case 0: {
                return "No results found";
            }
            case 1: {
                return "1 result";
            }
            default: {
                return `${n} results`;
            }
        }
    }

    _handleTableRowClick(row: SnpSearchModel) {
        this._navigateToSnp({rsId: row.rsId, alt: row.altBase});
    }
}
