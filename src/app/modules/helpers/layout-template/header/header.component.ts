import {Component, HostBinding, OnInit} from "@angular/core";
import {version} from "../../../../helpers/constants";
import {SearchQueryModel} from "../../../../models/searchQueryModel";
import {convertFormToParams} from "../../../../helpers/check-functions.helper";
import {AppState} from "../../../../store/reducer";
import {Store} from "@ngrx/store";
import * as fromSelectors from "src/app/store/selector";
import {Observable} from "rxjs";

@Component({
  selector: "asb-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.less"]
})
export class AsbHeaderComponent implements OnInit {
    @HostBinding("class.asb-header")
    private readonly cssClass = true;
    public navigationBarOpened: boolean = false;
    public version: string;
    public searchQuery: Observable<SearchQueryModel>;

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.version = version;
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
