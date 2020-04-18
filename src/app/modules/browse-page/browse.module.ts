import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {BrowsePageComponent} from "./browse-page.component";

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [BrowsePageComponent],
    exports: [BrowsePageComponent],
})
export class AsbBrowsePageModule {
}
