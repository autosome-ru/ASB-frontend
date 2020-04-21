import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {BrowsePageComponent} from "./browse-page.component";
import {AsbBrowsePageRoutingModule} from "./browse-page-routing.module";
import {AsbHelpersModule} from "../helpers/helpers.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
    imports: [
        CommonModule,
        AsbHelpersModule,
        AsbBrowsePageRoutingModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatButtonToggleModule,
        MatProgressSpinnerModule,

    ],
    declarations: [BrowsePageComponent],
})
export class AsbBrowsePageModule {
}
