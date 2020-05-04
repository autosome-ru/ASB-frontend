import {ChangeDetectionStrategy, Component, HostBinding, HostListener, Inject, OnInit, PLATFORM_ID} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {isPlatformBrowser} from "@angular/common";
import {AppState} from "../../store/reducer";
import * as fromSelectors from "src/app/store/selector";
import {Store} from "@ngrx/store";
import * as fromActions from "src/app/store/action";
import {TotalInfoModel} from "../../models/data.model";
import {Observable} from "rxjs";
import {SeoModel} from "../../models/seo.model";
import {SeoService} from "../../services/seo.servise";

@Component({
    selector: "home-page",
    templateUrl: "./home-page.component.html",
    styleUrls: [ "./home-page.component.less" ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
    @HostBinding("class.asb-home")
    private readonly cssClass = true;


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


    constructor(private route: ActivatedRoute,
                private store: Store<AppState>,
                private seoService: SeoService,
                @Inject(PLATFORM_ID) private platformId: Object) {
                        this.isBrowser = isPlatformBrowser(this.platformId);
    }


    ngOnInit() {
        this.seoService.updateSeoInfo(this.route.snapshot.data as SeoModel);

        this.totalInfo$ = this.store.select(fromSelectors.selectTotalInfo);

        this.store.dispatch(new fromActions.data.InitTotalInfoAction());

    }
}
