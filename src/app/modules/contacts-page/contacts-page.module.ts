import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {ContactsPageComponent} from "./contacts-page.component";
import {AsbContactsPageRoutingModule} from "./contacts-page-routing.module";

@NgModule({
    imports: [
        CommonModule,
        AsbContactsPageRoutingModule
    ],
    declarations: [ContactsPageComponent],
})
export class AsbContactsPageModule {
}
