import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "src/app/store";
import * as fromSelectors from "src/app/store/selector";
import * as fromActions from "src/app/store/action";
import {SearchModel} from "src/app/models/search.model";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'asb-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

    public searchForm: FormGroup;
    public searchOptions$: Observable<string[]>;
    public searchOptionsLoading$: Observable<boolean>;
    private readonly nullValue: SearchModel = {searchInput: ""};
    @Input()
    public align: "restricted" | "full";
    private input: Observable<SearchModel>;

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
        this.searchOptions$ = this.store.select(fromSelectors.selectCurrentSearchOptions);
        this.searchOptionsLoading$ = this.store.select(fromSelectors.selectCurrentSearchOptionsLoading);
        this.input = this.store.select(fromSelectors.selectCurrentSearchQuery);
        this.input.subscribe(s => this.searchForm.setValue({searchInput: s.searchInput},
            {emitEvent: false}));

        this.searchForm.valueChanges.subscribe(val => {
                this.store.dispatch(new fromActions.search.SetFilterAction(val as SearchModel));
                this.store.dispatch(new fromActions.search.LoadSearchOptionsAction(val as SearchModel))
            }
        );
        }

        _clearSearchField() {
            this.searchForm.patchValue(this.nullValue);
        }
        _navigateToSearch() {
            if (!!this.searchForm.get('searchInput').value) {
                if (this.router.isActive("search", false)) {
                    this.store.dispatch(new fromActions.search.SetFilterAction({searchInput: "Input Accepted"}))
                } else {
                    this.router.navigate(["/search/" + this.searchForm.get('searchInput').value]);
                }
            }
        }
}
