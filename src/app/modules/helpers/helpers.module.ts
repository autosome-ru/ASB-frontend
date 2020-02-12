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
import {LayoutComponent} from "./layout-template/layout.component";
import {AsbFooterComponent} from "./layout-template/footer/footer.component";
import {AsbHeaderComponent} from "./layout-template/header/header.component";
import { AsbTableComponent } from './asb-table/asb-table.component';
import {NgbDropdownModule, NgbNavModule} from '@ng-bootstrap/ng-bootstrap';

import {MatTableModule} from "@angular/material/table";

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
        NgbNavModule,
        NgbDropdownModule,
        MatTableModule,
    ],
    declarations: [SearchComponent, AsbFooterComponent, AsbHeaderComponent, LayoutComponent, AsbTableComponent],
    exports: [SearchComponent, LayoutComponent, AsbTableComponent],
})
export class AsbHelpersModule {
}
