import {NgModule} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {MatIconRegistry} from "@angular/material/icon";

const ICONS = [
    "add",
    "card",
    "chevron-down",
    "clear",
    "copy",
    "done",
    "dots-vert",
    "download",
    "download_cl",
    "edit",
    "filter",
    "help",
    "history",
    "list",
    "menu",
    "move",
    "refresh",
    "search",
    "settings",
    "star",
    "stats",
    "trash",
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
