import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BrowsePageComponent} from "./browse-page.component";
import {AsbBrowsePageRoutingModule} from "./browse-page-routing.module";
import {AsbTablesModule} from "../../shared/table-template/table.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
    imports: [
        CommonModule,
        AsbTablesModule,
        AsbBrowsePageRoutingModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatButtonToggleModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatIconModule
    ],
    declarations: [BrowsePageComponent],
})
export class AsbBrowsePageModule {
}
