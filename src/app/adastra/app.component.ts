import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Inject,
    OnDestroy,
    OnInit,
    PLATFORM_ID, ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {isPlatformBrowser} from "@angular/common";
import {ReleasesService} from "../services/releases.service";
import {AppState} from "../store/reducer/adastra";
import {Store} from "@ngrx/store";
import * as fromActions from "src/app/store/action/adastra";
import {Subscription} from "rxjs";
import {JoyrideService} from "ngx-joyride";
import {SwUpdate} from "@angular/service-worker";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, OnDestroy {
    @HostBinding("class.asb-app")
    private cssClass = true;
    @ViewChild('popoverTemplate')
    private popoverTemplate
    private readonly isBrowser: boolean;
    private subscriptions = new Subscription();
    private dialog: MatDialogRef<unknown, any>;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private joyrideService: JoyrideService,
                private store: Store<AppState>,
                private updates: SwUpdate,
                private matDialog: MatDialog,
                private releasesService: ReleasesService,
                @Inject(PLATFORM_ID) private platformId) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    ngOnInit() {
        this.subscriptions.add(
            this.updates.available.subscribe(() =>
            console.log('newer version of app is available'))
        );
        this.updates.checkForUpdate().then(
            () => null,
            () => console.log('sw not supported')
        )
        this.subscriptions.add(
            this.router.events.subscribe(() => {
                this.store.dispatch(new fromActions.releases.GetCurrentReleaseAction());
            })
        );
    }

    onConfirmClick(): void {
        this.dialog.close(true);
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
