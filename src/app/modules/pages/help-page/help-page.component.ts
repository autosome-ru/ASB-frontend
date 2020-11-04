import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    Inject,
    OnInit,
    PLATFORM_ID,
    ViewEncapsulation
} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {SeoModel} from "../../../models/seo.model";
import * as fromSelectors from "src/app/store/selector";
import {SeoService} from "../../../services/seo.servise";
import {isPlatformBrowser} from "@angular/common";
import {AppState} from "../../../store/reducer";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {ReleaseModel} from "../../../models/releases.model";

@Component({
    selector: "asb-help-page",
    templateUrl: "./help-page.component.html",
    styleUrls: ["./help-page.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class HelpPageComponent implements OnInit, AfterViewInit {
    private readonly isBrowser: boolean;
    public currentRelease$: Observable<ReleaseModel>;

    constructor(private route: ActivatedRoute,
                private seoService: SeoService,
                private store: Store<AppState>,
                @Inject(PLATFORM_ID) private platformId
) { this.isBrowser = isPlatformBrowser(platformId); }



    ngOnInit(): void {
        this.currentRelease$ = this.store.select(fromSelectors.selectCurrentRelease)
        this.seoService.updateSeoInfo(this.route.snapshot.data as SeoModel);
    }
    ngAfterViewInit() {
        if (this.isBrowser) {
            const initialElement: HTMLElement = document.getElementById(this.route.snapshot.fragment);
            if (initialElement) {
                initialElement.scrollIntoView({behavior: "smooth"});
            }
        }
    }

    getId(value: string) {
        return value.replace(" ", "-");
    }

    getApiUrl(): string {
        return `https://adastra.autosome.ru/api/`
    }
}
