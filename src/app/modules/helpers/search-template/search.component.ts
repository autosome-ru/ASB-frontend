import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "src/app/store";
import * as fromSelectors from "src/app/store/selector";
import * as fromActions from "src/app/store/action";
import {SearchQueryModel} from "src/app/models/searchQueryModel";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
    selector: "asb-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.less"],
})
export class SearchComponent implements OnInit {
    @HostBinding("class.asb-search")
    private readonly cssClass = true;
    public searchForm: FormGroup;
    private readonly nullValue: SearchQueryModel = {searchInput: ""};
    @Input()
    public width: "restricted" | "full";
    private input$: Observable<SearchQueryModel>;

    @Output ()
    public searchQuery: EventEmitter<SearchQueryModel>;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<AppState>,
        private router: Router,
        private route: ActivatedRoute,
        private titleService: Title,
    ) {}

    ngOnInit() {
        this.titleService.setTitle(this.route.snapshot.data.title);

        this.searchForm = this.formBuilder.group({
            searchInput: "",
        });
        this.input$ = this.store.select(fromSelectors.selectCurrentSearchQuery);
        this.input$.subscribe(s => this.searchForm.setValue({searchInput: s.searchInput},
            {emitEvent: false}));

        }

    _clearSearchField() {
        this.searchForm.patchValue(this.nullValue);
    }
    _navigateToSearch() {
        if (!!this.searchForm.get("searchInput").value) {
            const currentFilter = this.searchForm.value as SearchQueryModel;
            this.store.dispatch(new fromActions.search.SetFilterAction(currentFilter));
            this.store.dispatch(new fromActions.search.LoadSearchResultsAction(currentFilter));
            if (!this.router.isActive("/search", true)) {
                this.router.navigate(["/search"]);
            }
        }

    }
    _navigateToAdvancedSearch() {
        if (this.router.isActive("search", false)) {
            this.store.dispatch(new fromActions.search.LoadSearchResultsAction(
                this.searchForm.get("searchInput").value as SearchQueryModel));
        } else {
            this.router.navigate(["/search"]);
        }
    }


}
