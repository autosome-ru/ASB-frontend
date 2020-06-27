import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {HelpPageComponent} from "./help-page.component";
import {AsbHelpPageRoutingModule} from "./help-page-routing.module";
import {ContactsPageComponent} from "./contacts-page/contacts-page.component";

@NgModule({
    imports: [
        CommonModule,
        AsbHelpPageRoutingModule
    ],
    declarations: [HelpPageComponent, ContactsPageComponent],
})
export class AsbHelpPageModule {
}
