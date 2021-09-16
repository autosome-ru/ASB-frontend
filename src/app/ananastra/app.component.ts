import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Overlay} from "@angular/cdk/overlay";

@Component({
  selector: 'astra-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements AfterViewInit {
    @ViewChild('cookiesDialogTemplate')
    private cookiesDialogTemplate: TemplateRef<MatDialog>

    constructor(private dialog: MatDialog,
                private overlay: Overlay) {}

    ngAfterViewInit() {
        const cookiesConsent = localStorage.getItem('cookieConsent')
        if (!cookiesConsent || cookiesConsent !== 'true') {
            this.dialog.open(this.cookiesDialogTemplate, {
                hasBackdrop: false,
                closeOnNavigation: false,
                disableClose: true,
                scrollStrategy: this.overlay.scrollStrategies.reposition(),
                position: {
                    bottom: '16px',
                    left: '16px'
                },
                maxWidth: 430,
            })
        }
    }

    saveCookiesConsent() {
        localStorage.setItem('cookieConsent', 'true')
    }
}
