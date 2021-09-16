import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Inject,
    OnDestroy,
    OnInit,
    PLATFORM_ID, TemplateRef, ViewChild,
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
import {ToastrService} from "ngx-toastr";
import {CheckForUpdateService} from "../services/update.service";
import {updateCheckInterval} from "../helpers/constants/constants";
import {MatDialog} from "@angular/material/dialog";
import {Overlay} from "@angular/cdk/overlay";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
    @HostBinding("class.asb-app")
    private cssClass = true;
    @ViewChild('cookiesDialogTemplate')
    private cookiesDialogTemplate: TemplateRef<MatDialog>
    private readonly isBrowser: boolean;
    private subscriptions = new Subscription();

    constructor(private router: Router,
                private route: ActivatedRoute,
                private joyrideService: JoyrideService,
                private store: Store<AppState>,
                private updates: SwUpdate,
                private dialog: MatDialog,
                private overlay: Overlay,
                private checkForUpdatesService: CheckForUpdateService,
                private toastrService: ToastrService,
                private releasesService: ReleasesService,
                @Inject(PLATFORM_ID) private platformId) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    ngOnInit() {
        if (this.isBrowser) {
            this.subscriptions.add(
                this.updates.available.subscribe(() =>
                    this.toastrService.info(
                        'ADASTRA has been updated to a new version.' +
                        ' Please reload the page.', 'Info',
                        {timeOut: updateCheckInterval})
                ));
            this.checkForUpdatesService.startSubscription();
        }
        this.subscriptions.add(
            this.router.events.subscribe(() => {
                this.store.dispatch(new fromActions.releases.GetCurrentReleaseAction());
            })
        );
    }
    ngAfterViewInit() {
        const cookiesConsent = localStorage.getItem('cookieConsent')
        if (!cookiesConsent || cookiesConsent !== 'true') {
            this.dialog.open(this.cookiesDialogTemplate, {
                hasBackdrop: false,
                closeOnNavigation: false,
                disableClose: true,
                scrollStrategy: this.overlay.scrollStrategies.noop(),
                position: {
                    bottom: '16px',
                    left: '16px'
                },
                maxWidth: 430,

            })
        }
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
        this.checkForUpdatesService.cancelSubscription();
    }

    saveCookiesConsent() {
        localStorage.setItem('cookieConsent', 'true')
    }
}
