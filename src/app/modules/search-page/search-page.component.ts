import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {SnpInfoModel} from "../../models/data.model";
import {AppState} from "../../store/reducer";
import * as fromSelectors from "src/app/store/selector";
import {Store} from "@ngrx/store";

@Component({
  selector: 'asb-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.less']
})
export class SearchPageComponent implements OnInit {
    @HostBinding("class.search-page")
    private readonly cssClass = true;
    public filter: string = "";
    public searchSnpResults$: Observable<SnpInfoModel[]>;
    public searchSnpResultsLoading$: Observable<boolean>;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>,
                private router: Router,
                private titleService: Title) {}
    ngOnInit() {
        this.titleService.setTitle(this.route.snapshot.data.title);
        this.filter = this.route.snapshot.paramMap.get("id");

        this.searchSnpResults$ = this.store.select(fromSelectors.selectCurrentSearchResults);
        this.searchSnpResultsLoading$ = this.store.select(fromSelectors.selectCurrentSearchResultsLoading);
    }

    _navigateToSnp(id: string) {
        this.router.navigate(["/data/snp/" + id]);
    }

    getPhrase(n: number): string {
        switch (n) {
            case 0: {
                return "No results found"
            }
            case 1: {
                return "1 result"
            }
            default: {
                return `${n} results`
            }
        }
    }
}
