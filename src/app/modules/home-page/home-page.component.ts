import {Component, HostBinding, HostListener, Inject, OnInit, PLATFORM_ID} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {isPlatformBrowser} from "@angular/common";
import {AppState} from "../../store/reducer";
import * as fromSelectors from "src/app/store/selector";
import {Store} from "@ngrx/store";
import * as fromActions from "src/app/store/action";
import {TotalInfoModel} from "../../models/data.model";
import {Observable} from "rxjs";

@Component({
    selector: "home-page",
    templateUrl: "./home-page.component.html",
    styleUrls: [ "./home-page.component.less" ]
})
export class HomePageComponent implements OnInit {
    @HostBinding("class.asb-home")
    private readonly cssClass = true;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>,
                private titleService: Title,
                @Inject(PLATFORM_ID) private platformId: Object) {
                        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    opacity: number = 1;
    isBrowser: boolean;
    public totalInfo$: Observable<TotalInfoModel>;

    @HostListener("window:scroll", [])
    onScroll() {
        if (this.isBrowser) {
            const pos = (document.documentElement.scrollTop || document.body.scrollTop);
            if (pos) {
                this.opacity = 1 - 3 * pos / document.documentElement.offsetWidth;
            } else {
                this.opacity = 1;
            }
        }

    }
    ngOnInit() {
        this.titleService.setTitle(this.route.snapshot.data.title);

        this.totalInfo$ = this.store.select(fromSelectors.selectTotalInfo);

        this.store.dispatch(new fromActions.data.InitTotalInfoAction());

    }
}
