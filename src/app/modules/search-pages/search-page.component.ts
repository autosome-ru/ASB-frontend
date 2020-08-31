import {ChangeDetectionStrategy, Component, HostBinding, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {AppState} from "../../store/reducer";
import * as fromActions from "src/app/store/action";
import {Store} from "@ngrx/store";
import * as fromSelectors from "src/app/store/selector";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatButtonToggleChange} from "@angular/material/button-toggle";
import {SearchQueryModel, SearchResultsModel} from "../../models/searchQueryModel";
import {SearchComponent} from "../helpers/search-template/search.component";
import {SeoModel} from "../../models/seo.model";
import {SeoService} from "../../services/seo.servise";
import {AsbServerSideModel} from "../../models/table.model";
import {initialServerParams} from "../../helpers/constants";
import {SearchPageTableComponent} from "./search-table/search-table.component";
import {ReleaseModel} from "../../models/releases.model";
import {getTextByStepName} from "../../helpers/tour-text.helper";
import {JoyrideService} from "ngx-joyride";

@Component({
    selector: "asb-search-page",
    templateUrl: "./search-page.component.html",
    styleUrls: ["./search-page.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent implements OnInit, OnDestroy {
    @ViewChild("searchTableComponent", {static: true})
    public searchPageTableComponent: SearchPageTableComponent;

    @ViewChild(MatPaginator, {static: false})
    public paginator: MatPaginator;

    @ViewChild("searchComponent", {static: true})
    public searchComponent: SearchComponent;

    @HostBinding("class.search-pages")
    private readonly cssClass = true;

    private subscriptions = new Subscription();

    public searchSnpResults$: Observable<SearchResultsModel>;
    public searchSnpResultsLoading$: Observable<boolean>;

    isAdvancedSearch: boolean;

    public pagination: AsbServerSideModel;
    public groupValue: "list" | "card";
    public searchSnpResultsChanged$: Observable<boolean>;
    public searchQuery$: Observable<SearchQueryModel>;
    private firstTimeOpen: boolean;
    public release$: Observable<ReleaseModel>;
    private resultsLen: number;
    public tourSteps: string[];

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>,
                private joyrideService: JoyrideService,
                private router: Router,
                private seoService: SeoService) {}
    ngOnInit() {
        this.seoService.updateSeoInfo(this.route.snapshot.data as SeoModel);
        this.release$ = this.store.select(fromSelectors.selectCurrentRelease)
        this.isAdvancedSearch = !this.router.url.includes("search/simple");
        if (this.route.snapshot.queryParams.rs ||
            (this.route.snapshot.queryParams.pos &&
                this.route.snapshot.queryParams.pos.match(/^\d*$/))) {
            this.groupValue = "card";
        } else {
            this.groupValue = "list";
        }
        this.subscriptions.add(
            this.store.select(fromSelectors.selectCurrentSearchResults).subscribe(
                s => this.resultsLen = s.total
            )
        )
        this.firstTimeOpen = this.route.snapshot.queryParams['skip_check'] != '1';
        this.pagination = initialServerParams;
        this.searchQuery$ = this.store.select(fromSelectors.selectCurrentSearchQuery)
        this.searchSnpResults$ = this.store.select(fromSelectors.selectCurrentSearchResults);
        this.searchSnpResultsLoading$ = this.store.select(fromSelectors.selectCurrentSearchResultsLoading);
        this.searchSnpResultsChanged$ = this.store.select(fromSelectors.selectCurrentSearchResultsChanged);
        this.subscriptions.add(
            this.searchQuery$.subscribe(
                (q) => {
                    if (q) {
                        this.pagination = {
                            active: q.active || initialServerParams.active,
                            direction: q.direction || initialServerParams.direction,
                            pageSize: q.pageSize || initialServerParams.pageSize,
                            pageIndex: q.pageIndex || initialServerParams.pageIndex
                        }
                    }
                }
            )
        );
    if (this.isAdvancedSearch) {
        this.tourSteps = [
            'search-pos',
            'search-adv-example',
            'search-download',
            'search-view',
            'cell-types-buttons',
            'transcription-factors-buttons',
        ]
    } else {
        this.tourSteps = [
            'search-by',
            'search-rs',
            'search-pos',
            'search-example',
            'search-nearby',
            'search-view',
            'cell-types-buttons',
            'transcription-factors-buttons',
        ]
    }
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe()
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
        this.pagination = event;
        this.store.dispatch(new fromActions.search.LoadSearchResultsWithPaginationAction(
            {
                params: event
            })
        );
    }

    _handleSearchTemplateChanges(event: SearchQueryModel) {
        if (!this.firstTimeOpen) {
            this.pagination = {
                ...initialServerParams,
                pageSize: this.pagination.pageSize
            };
        }
        this.firstTimeOpen = false
        this.store.dispatch(new fromActions.search.LoadSearchResultsAction(
            {
                search: event,
                params: this.pagination,
            }));
        if (this.paginator) {
            this.paginator.pageSize = this.pagination.pageSize;
            this.paginator.firstPage();
        }
    }

    _groupToggled(event: MatButtonToggleChange) {
        this.groupValue = event.value;
        if (this.paginator && this.paginator.pageIndex !== 0) {
            this.paginator.firstPage();
        } else {
            this._handlePaginationChange(initialServerParams);
        }
    }



    _navigateToSnp(id: string, alt: string): void {
        this.subscriptions.add(
            this.release$.subscribe((s) =>
                this.router.navigateByUrl(`${s.url}/snps/${id}/${alt}`).then(() => window.scrollTo(0, 0))
            )
        );
    }

    pageModelToChange(event: PageEvent): AsbServerSideModel {
        return {
            ...this.pagination,
            pageSize: event.pageSize,
            pageIndex: event.pageIndex
        };
    }

    getTextByStepName(step: string) {
        return getTextByStepName(step)
    }

    checkResult() {
        if (!this.resultsLen) {
            this.searchComponent._initDemo()
        }
    }
}
