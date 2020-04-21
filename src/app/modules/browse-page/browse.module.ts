import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {BrowsePageComponent} from "./browse-page.component";
import {AsbBrowsePageRoutingModule} from "./browse-page-routing.module";
import {AsbHelpersModule} from "../helpers/helpers.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonToggleModule} from "@angular/material/button-toggle";

@NgModule({
    imports: [
        CommonModule,
        AsbHelpersModule,
        AsbBrowsePageRoutingModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatButtonToggleModule,

    ],
    declarations: [BrowsePageComponent],
})
export class AsbBrowsePageModule {
}
