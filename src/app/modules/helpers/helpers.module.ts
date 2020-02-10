import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatToolbarModule} from "@angular/material/toolbar";
import { SearchComponent } from './search/search.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import {PageTemplateComponent} from "./page-template/page-template.component";
import {AsbFooterComponent} from "./page-template/footer/footer.component";
import {AsbHeaderComponent} from "./page-template/header/header.component";

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
        RouterModule,
    ],
    declarations: [SearchComponent, AsbFooterComponent, AsbHeaderComponent, PageTemplateComponent],
    exports: [SearchComponent, PageTemplateComponent],
})
export class AsbHelpersModule {
}
