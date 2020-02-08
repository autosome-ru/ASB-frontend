import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "@app/store";
import * as fromSelectors from "@app/store/selector";
import * as fromActions from "@app/store/action";
import {map} from "rxjs/operators";
import {SearchModel} from "@app/models/search.model";
import {Observable} from "rxjs";

@Component({
  selector: 'asb-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

    public searchForm: FormGroup;
    public searchOptions$: string[];
    public searchOptionsLoading$: boolean;
    @Input()
    public align: "max" | "full";
    private input: Observable<SearchModel>;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<AppState>
    ) {}

  ngOnInit() {
      this.searchForm = this.formBuilder.group({
          searchInput: "",
      });
      this.searchOptions$ = ["one", "two", "three"];
      this.searchOptionsLoading$ = false;
      this.input = this.store.select(fromSelectors.selectCurrentSearchQuery);
      this.input.subscribe(s => this.searchForm.setValue({searchInput: s.searchInput},
          {emitEvent: false}));

      this.searchForm.valueChanges.subscribe(val =>
              this.store.dispatch(new fromActions.search.SetFilterAction(val as SearchModel))
          );
    }
}
