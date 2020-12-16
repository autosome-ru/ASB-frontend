import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {HelpPageComponent} from "./help-page.component";
import {AsbHelpPageRoutingModule} from "./help-page-routing.module";
import {AnanasHelpModule} from "../ananas-help-page/ananas-help.module";

@NgModule({
    imports: [
        CommonModule,
        AsbHelpPageRoutingModule,
        AnanasHelpModule
    ],
    declarations: [HelpPageComponent],
})
export class AsbHelpPageModule {
}
