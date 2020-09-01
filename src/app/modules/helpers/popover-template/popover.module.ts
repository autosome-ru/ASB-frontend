import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AsbPopoverComponent} from "./popover.component";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FullscreenOverlayContainer, OverlayContainer} from "@angular/cdk/overlay";



@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
    ],
    declarations: [
        AsbPopoverComponent
    ],
    exports: [
        AsbPopoverComponent
    ],
    providers: [{provide: OverlayContainer, useClass: FullscreenOverlayContainer}],
})
export class AsbPopoverModule {
}
