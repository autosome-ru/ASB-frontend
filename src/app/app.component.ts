import {
    ChangeDetectionStrategy,
    Component,
    HostBinding, Inject,
    OnInit, PLATFORM_ID,
} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {isPlatformBrowser} from "@angular/common";
import {ReleasesService} from "./services/releases.service";
import {AppState} from "./store/reducer";
import {Store} from "@ngrx/store";
import * as fromActions from "src/app/store/action";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent  implements  OnInit {
    @HostBinding("class.asb-app")
    private cssClass = true;
    private readonly isBrowser: boolean;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private store: Store<AppState>,
                private releasesService: ReleasesService,
                @Inject(PLATFORM_ID) private platformId) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    ngOnInit() {
        this.router.events.subscribe(() => {
            this.store.dispatch(new fromActions.releases.GetCurrentReleaseAction())
        })
    }
}
