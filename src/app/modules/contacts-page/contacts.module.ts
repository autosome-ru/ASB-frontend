import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {ContactsPageComponent} from "./contacts-page.component";

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [ContactsPageComponent],
    exports: [ContactsPageComponent],
})
export class AsbContactsPageModule {
}
