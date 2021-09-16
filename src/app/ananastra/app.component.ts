import {ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'astra-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnInit {
    @ViewChild('cookiesDialogTemplate')
    private cookiesDialogTemplate: TemplateRef<MatDialog>

    constructor(private dialog: MatDialog) {}

    ngOnInit() {
        const cookiesConsent = localStorage.getItem('cookieConsent')
        if (!cookiesConsent || cookiesConsent !== 'true') {
            this.dialog.open(this.cookiesDialogTemplate)
        }
    }

    saveCookiesConsent() {
        localStorage.setItem('cookieConsent', 'true')
    }
}
