import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomePageComponent} from "./home-page.component";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {AsbHelpersModule} from "../helpers/helpers.module";

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatIconModule,
        AsbHelpersModule,
    ],
    declarations: [HomePageComponent],
    exports: [HomePageComponent],
})
export class AsbHomePageModule {
}
