import {Component, HostBinding, OnInit} from "@angular/core";
import {SearchQueryModel} from "../../../../models/searchQueryModel";
import {convertFormToParams} from "../../../../helpers/check-functions.helper";
import {AppState} from "../../../../store/reducer";
import {Store} from "@ngrx/store";
import * as fromSelectors from "src/app/store/selector";
import {Observable} from "rxjs";
import {ReleaseModel} from "../../../../models/releases.model";

@Component({
  selector: "asb-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.less"]
})
export class AsbHeaderComponent implements OnInit {
    @HostBinding("class.asb-header")
    private readonly cssClass = true;
    public navigationBarOpened: boolean = false;
    public searchQuery: Observable<SearchQueryModel>;
    public currentRelease$: Observable<ReleaseModel>;

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.currentRelease$ = this.store.select(fromSelectors.selectCurrentRelease)
        this.searchQuery = this.store.select(fromSelectors.selectCurrentSearchQuery);
    }

    toggleNavbar(event: "toggle" | "close") {
        if (event === "toggle") {
            this.navigationBarOpened = !this.navigationBarOpened;
        } else {
            this.navigationBarOpened = false;
        }
    }

    _convertFormToParams(form: SearchQueryModel) {
        return convertFormToParams(form);
    }
}
