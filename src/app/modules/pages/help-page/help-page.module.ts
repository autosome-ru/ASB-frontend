import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {HelpPageComponent} from "./help-page.component";
import {AsbHelpPageRoutingModule} from "./help-page-routing.module";

@NgModule({
    imports: [
        CommonModule,
        AsbHelpPageRoutingModule
    ],
    declarations: [HelpPageComponent],
})
export class AsbHelpPageModule {
}
