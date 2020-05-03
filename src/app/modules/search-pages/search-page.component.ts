import {ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AppState} from "../../store/reducer";
import * as fromSelectors from "src/app/store/selector";
import * as fromActions from "src/app/store/action";
import {Store} from "@ngrx/store";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatButtonToggleChange} from "@angular/material/button-toggle";
import {SearchQueryModel, SearchResultsModel} from "../../models/searchQueryModel";
import {SearchComponent} from "../helpers/search-template/search.component";
import {SeoModel} from "../../models/seo.model";
import {SeoService} from "../../services/seo.servise";
import {AsbServerSideModel} from "../../models/table.model";
import {initialServerParams} from "../../helpers/constants";
import {SearchPageTableComponent} from "./search-table/search-table.component";

@Component({
    selector: "asb-search-page",
    templateUrl: "./search-page.component.html",
    styleUrls: ["./search-page.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent implements OnInit {
    @ViewChild("searchTableComponent", {static: true})
    public searchPageTableComponent: SearchPageTableComponent;

    @ViewChild(MatPaginator, {static: false})
    public paginator: MatPaginator;

    @ViewChild("searchComponent", {static: true})
    public searchComponent: SearchComponent;

    @HostBinding("class.search-pages")
    private readonly cssClass = true;

    public searchSnpResults$: Observable<SearchResultsModel>;
    public searchSnpResultsLoading$: Observable<boolean>;

    isAdvancedSearch: boolean;

    public pageSize: number;
    public groupValue: "list" | "card";
    public searchSnpResultsChanged$: Observable<boolean>;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>,
                private router: Router,
                private seoService: SeoService) {}
    ngOnInit() {
        this.seoService.updateSeoInfo(this.route.snapshot.data as SeoModel);

        this.isAdvancedSearch = !this.router.isActive("/search/simple", false);
        if (this.route.snapshot.queryParams.rs ||
            (this.route.snapshot.queryParams.pos &&
                this.route.snapshot.queryParams.pos.match(/^\d*$/))) {
            this.groupValue = "card";
            this.pageSize = 3;
        } else {
            this.groupValue = "list";
            this.pageSize = 10;
        }

        this.searchSnpResults$ = this.store.select(fromSelectors.selectCurrentSearchResults);
        this.searchSnpResultsLoading$ = this.store.select(fromSelectors.selectCurrentSearchResultsLoading);
        this.searchSnpResultsChanged$ = this.store.select(fromSelectors.selectCurrentSearchResultsChanged);
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

    _handlePaginationChange(event: AsbServerSideModel) {
        this.pageSize = event.pageSize;
        this.store.dispatch(new fromActions.search.LoadSearchResultsWithPaginationAction(
            {
                isAdvanced: this.isAdvancedSearch,
                params: event
            })
        );
    }

    _handleSearchTemplateChanges(event: SearchQueryModel) {
        this.store.dispatch(new fromActions.search.LoadSearchResultsAction(
            {
                search: event,
                isAdvanced: this.isAdvancedSearch,
                params: initialServerParams
            }));
        this.paginator.pageSize = this.pageSize;
        this.paginator.firstPage();
    }

    _groupToggled(event: MatButtonToggleChange) {
        if (event.value === "list") {
            this.pageSize = 10;
        } else {
            this.pageSize = 3;
        }
        this.groupValue = event.value;
        if (this.paginator) {
            this.paginator.firstPage();
            this.paginator.pageSize = this.pageSize;
        }
        this._handlePaginationChange(initialServerParams);
    }



    _navigateToSnp(id: string, alt: string): void {
        this.router.navigateByUrl("snps/" + id + "/" + alt).then(() => window.scrollTo(0, 0));
    }

    pageModelToChange(event: PageEvent): AsbServerSideModel {
        return {
            active: null,
            direction: "",
            pageSize: event.pageSize,
            pageIndex: event.pageIndex
        };
    }
}
