import {ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {SnpSearchModel} from "../../models/data.model";
import {AppState} from "../../store/reducer";
import * as fromSelectors from "src/app/store/selector";
import * as fromActions from "src/app/store/action";
import {Store} from "@ngrx/store";
import {AsbTableComponent} from "../helpers/table-template/table.component";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatButtonToggleChange} from "@angular/material/button-toggle";
import {SearchResultsModel} from "../../models/searchQueryModel";
import {SearchComponent} from "../helpers/search-template/search.component";
import {SeoModel} from "../../models/seo.model";
import {SeoService} from "../../services/seo.servise";
import {AsbTableChangesModel} from "../../models/table.model";

@Component({
    selector: "asb-search-page",
    templateUrl: "./search-page.component.html",
    styleUrls: ["./search-page.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent implements OnInit {
    @ViewChild("tableView", {static: true})
    public tableView: AsbTableComponent<SnpSearchModel>;

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

    _handleChange(event: AsbTableChangesModel) {
        this.store.dispatch(
            new fromActions.search.LoadSearchResultsWithPaginationAction({
                isAdvanced: this.isAdvancedSearch,
                params: {
                    pageIndex: event.pageIndex,
                    pageSize: event.pageSize,
                    direction: "",
                    active: null
                }
            })
        );
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
    }



    _navigateToSnp(id: string, alt: string): void {
        this.router.navigateByUrl("snps/" + id + "/" + alt).then();
    }

    pageModelToChange(event: PageEvent): AsbTableChangesModel {
        return {
            active: null,
            direction: "",
            pageSize: event.pageSize,
            pageIndex: event.pageIndex
        };
    }
}
