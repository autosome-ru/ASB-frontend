import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {BrowsePageComponent} from "./browse-page.component";
import {AsbBrowsePageRoutingModule} from "./browse-page-routing.module";

@NgModule({
    imports: [
        CommonModule,
        AsbBrowsePageRoutingModule
    ],
    declarations: [BrowsePageComponent],
})
export class AsbBrowsePageModule {
}
