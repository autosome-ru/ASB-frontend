import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SearchComponent} from "./search.component";
import {MatButtonModule} from "@angular/material/button";
import {AsbTourModule} from "../tour-template/tour-module";
import {JoyrideModule} from "ngx-joyride";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatChipsModule} from "@angular/material/chips";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSelectModule} from "@angular/material/select";
import {RouterModule} from "@angular/router";
import {FormFieldsModule} from "../form-fields/form-fields.module";
import {AsbDirectivesModule} from "../../../directives/directives.module";



@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        AsbTourModule,
        JoyrideModule.forChild(),
        MatIconModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
        MatInputModule,
        MatChipsModule,
        MatTooltipModule,
        MatSelectModule,
        RouterModule,
        FormFieldsModule,
        AsbDirectivesModule,
    ],
    declarations: [
        SearchComponent,
    ],
    exports: [
        SearchComponent
    ],
    providers: [],
})
export class AsbSearchModule {}
