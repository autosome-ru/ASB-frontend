import {ChangeDetectionStrategy, Component, ViewEncapsulation} from "@angular/core";

@Component({
    selector: "asb-cookies-consent",
    templateUrl: "./cookies-consent.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CookiesConsentComponent {

    saveCookiesConsent() {
        localStorage.setItem('cookieConsent', 'true')
    }
}
