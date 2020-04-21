import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {BrowseTfPageComponent} from "./tf-page/browse-tf-page.component";
import {AsbBrowsePageRoutingModule} from "./browse-page-routing.module";
import {BrowseClPageComponent} from "./cl-page/browse-cl-page.component";
import {AsbHelpersModule} from "../helpers/helpers.module";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";

@NgModule({
    imports: [
        CommonModule,
        AsbBrowsePageRoutingModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        AsbHelpersModule
    ],
    declarations: [BrowseTfPageComponent, BrowseClPageComponent],
})
export class AsbBrowsePageModule {
}
