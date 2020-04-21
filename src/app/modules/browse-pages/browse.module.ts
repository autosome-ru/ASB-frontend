import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {BrowseTfPageComponent} from "./tf-page/browse-tf-page.component";
import {AsbBrowsePageRoutingModule} from "./browse-page-routing.module";
import {BrowseClPageComponent} from "./cl-page/browse-cl-page.component";
import {AsbHelpersModule} from "../helpers/helpers.module";

@NgModule({
    imports: [
        CommonModule,
        AsbHelpersModule,
        AsbBrowsePageRoutingModule,

    ],
    declarations: [BrowseTfPageComponent, BrowseClPageComponent],
    exports: [BrowseTfPageComponent, BrowseClPageComponent],
})
export class AsbBrowsePageModule {
}
