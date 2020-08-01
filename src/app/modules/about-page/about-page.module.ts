import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {AboutPageComponent} from "./about-page.component";
import {AsbAboutPageRoutingModule} from "./about-page-routing.module";

@NgModule({
    imports: [
        CommonModule,
        AsbAboutPageRoutingModule
    ],
    declarations: [AboutPageComponent],
})
export class AsbAboutPageModule {
}
