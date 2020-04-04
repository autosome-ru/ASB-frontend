import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {HelpPageComponent} from "./help-page.component";

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [HelpPageComponent],
    exports: [HelpPageComponent],
})
export class AsbHelpPageModule {
}
