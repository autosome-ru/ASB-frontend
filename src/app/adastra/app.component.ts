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
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {isPlatformBrowser} from "@angular/common";
import {ReleasesService} from "../services/releases.service";
import {AppState} from "../store/reducer/adastra";
import {Store} from "@ngrx/store";
import * as fromActions from "src/app/store/action/adastra";
import {Subscription} from "rxjs";
import {JoyrideService} from "ngx-joyride";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {Overlay} from "@angular/cdk/overlay";
import {recentRelease} from "../helpers/constants/releases";
import {ReleaseModel} from "../models/releases.model";

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
    private cookiesDialogTemplate: TemplateRef<MatDialog>;
    private readonly isBrowser: boolean;
    private subscriptions = new Subscription();
    public recentRelease: ReleaseModel;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private joyrideService: JoyrideService,
                private store: Store<AppState>,
                private dialog: MatDialog,
                private overlay: Overlay,
                private toastrService: ToastrService,
                private releasesService: ReleasesService,
                @Inject(PLATFORM_ID) private platformId) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    ngOnInit(): void {
        this.recentRelease = recentRelease;

        this.subscriptions.add(
            this.router.events.subscribe(() => {
                this.store.dispatch(new fromActions.releases.GetCurrentReleaseAction());
            })
        );
    }
    ngAfterViewInit(): void {
        // const cookiesConsent = localStorage.getItem('cookieConsent')
        // if (!cookiesConsent || cookiesConsent !== 'true') {
        //     this.dialog.open(CookiesConsentComponent, {
        //         hasBackdrop: false,
        //         closeOnNavigation: false,
        //         disableClose: true,
        //         scrollStrategy: this.overlay.scrollStrategies.reposition(),
        //         position: {
        //             bottom: '16px',
        //             left: '16px'
        //         },
        //         maxWidth: 430,
        //     })
        // }
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
