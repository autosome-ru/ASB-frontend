import {NgModule} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {MatIconRegistry} from "@angular/material/icon";

const ICONS = [
    "clear",
    "add",
    "done",
    "like",
    "list",
    "videocam",
    "purchase-history",
    "double-arrow-left",
    "menu",
    "lock",
    "lock-open",
    "books",
    "money",
    "stats",
    "history",
    "settings",
    "help",
    "payment-complete",
    "payment-in-progress",
    "search",
    "star",
    "filter",
    "dots-vert",
    "move",
    "refresh",
    "edit",
    "trash",
    "chevron-down",
    "download",
    "power",
    "copy",
    "face",
    "level",
    "man_accrual",
    "event-icon",
    "brain",
    "coin",
    "notebook",
    "megaphone",
    "download_cl"
];

@NgModule({
    providers: [
        MatIconRegistry,
        HttpClientModule,
    ],
    exports: [
        HttpClientModule,
    ]
})
export class AsbAppIconsModule {

    constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        for (const icon of ICONS) {
            iconRegistry.addSvgIcon(
                icon,
                sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${icon}.svg`)
            );
        }
    }
}
