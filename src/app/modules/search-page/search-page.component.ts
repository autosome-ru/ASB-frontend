import { Component, HostBinding, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {SnpSearchModel} from "../../models/data.model";
import {AppState} from "../../store/reducer";
import * as fromSelectors from "src/app/store/selector";
import {Store} from "@ngrx/store";
import {AsbTableComponent} from "../helpers/table-template/table.component";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {map} from "rxjs/operators";
import {MatButtonToggleChange} from "@angular/material/button-toggle";
import {SearchResultsModel} from "../../models/searchQueryModel";

@Component({
  selector: "asb-search-page",
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.less"]
})
export class SearchPageComponent implements OnInit {
    @ViewChild("tableView", {static: true})
    public tableView: AsbTableComponent<SnpSearchModel>;

    @ViewChild(MatPaginator, {static: false})
    public paginator: MatPaginator;

    @HostBinding("class.search-page")
    private readonly cssClass = true;

    public searchSnpResults$: Observable<SearchResultsModel>;
    public filteredSnpResults$: Observable<SnpSearchModel[]>;

    public searchSnpResultsLoading$: Observable<boolean>;

    isAdvancedSearch: boolean;

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
                return `${searchResults.total} results`;

            }
        }
    }

    getAdditionalPhrase(searchResults: SearchResultsModel, loading: boolean) {
        if (loading) {
            return "";
        }
        return searchResults.total !== searchResults.results.length ?
            "Too many to display. Use get in tsv option" : "";
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


}
