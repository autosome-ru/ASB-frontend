import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component, OnDestroy,
    ViewEncapsulation
} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Overlay} from "@angular/cdk/overlay";
import {NavigationEnd, Router} from "@angular/router";
import {BehaviorSubject, Subscription} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'astra-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements AfterViewInit, OnDestroy {

    activeRoute$ = new BehaviorSubject<string>('')
    private subscriptions = new Subscription();
    constructor(private dialog: MatDialog,
                private router: Router,
                private overlay: Overlay) {}

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    ngAfterViewInit() {

        this.subscriptions.add(
            this.router.events.subscribe(
            (event: any) => {
                if (event instanceof NavigationEnd) {
                    this.activeRoute$.next(event.url)
                }
            })
        );
        // const cookiesConsent = localStorage.getItem('cookieConsent')
        // if (!cookiesConsent || cookiesConsent !== 'true') {
        //     this.dialog.open(this.cookiesDialogTemplate, {
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

    saveCookiesConsent() {
        localStorage.setItem('cookieConsent', 'true')
    }
}
