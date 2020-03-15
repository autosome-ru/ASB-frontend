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
    private readonly nullValue: {searchInput: string} = {searchInput: ""};
    @Input()
    public width: "restricted" | "full";
    private input$: Observable<SearchQueryModel>;
    public errorCode$: Observable<number>;

    @Output ()
    public searchQuery: EventEmitter<SearchQueryModel>;


    constructor(
        private formBuilder: FormBuilder,
        private store: Store<AppState>,
        private router: Router,
        private route: ActivatedRoute,
        private titleService: Title,
    ) {}

    public listOfChrs: string[] = [];

    ngOnInit() {
        this.titleService.setTitle(this.route.snapshot.data.title);
        for (let i = 1; i < 22; i++ ) {
            this.listOfChrs.push(String(i));
        }
        this.listOfChrs.push("X");
        this.searchForm = this.formBuilder.group({
            searchInput: [""],
            searchBy: ["id"],
            chromosome: ["1"]
        }, {
                validator: matchingPattern("searchInput", "searchBy"),
            }
        );
        this.input$ = this.store.select(fromSelectors.selectCurrentSearchQuery);
        this.errorCode$ = this.store.select(fromSelectors.selectCurrentSearchResultsErrorCode);
        this.input$.subscribe(s => this.searchForm.setValue(s,
            {emitEvent: false}));
        }

    _clearSearchField() {
        this.searchForm.patchValue(this.nullValue);
    }

    _navigateToSearch() {
        if (this.searchForm.get("searchInput").value && this.searchForm.valid) {
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

function matchingPattern(searchKey: string, optionKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
        const search: string = group.controls[searchKey].value;
        const option: string = group.controls[optionKey].value;

        if (option === "pos") {
            if (!search.match(/\d+:\d+/)) {
                return {
                    wrongPattern: true
                };
            }
            const posArray: string[] = search.split(":");
            if (posArray.length === 2) {
                const [startPos, endPos] = posArray;
                if (!Number(startPos) || !Number(endPos)) {
                    return {
                        wrongPattern: true
                    };
                }
                if (Number(startPos) > Number(endPos)) {
                    return {
                        greater: true
                    };
                }
            } else {
                return {
                    wrongPattern: true
                };
            }
        }
    };
}
