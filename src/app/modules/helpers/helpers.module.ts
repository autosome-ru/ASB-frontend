import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatToolbarModule} from "@angular/material/toolbar";
import { SearchComponent } from './search-template/search.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import {LayoutComponent} from "./layout-template/layout.component";
import {AsbFooterComponent} from "./layout-template/footer/footer.component";
import {AsbHeaderComponent} from "./layout-template/header/header.component";
import { AsbTableComponent } from './table-template/table.component';
import {NgbDropdownModule, NgbNavModule} from '@ng-bootstrap/ng-bootstrap';

import {MatTableModule} from "@angular/material/table";
import { AsbSnpCardComponent } from './data-template/snp-card/snp-card.component';
import {AsbElevationDirective} from "./elevation.directive";
import {SnpButtonsComponent} from "./data-template/snp-card/snp-buttons/snp-buttons.component";
import {MatChipsModule} from "@angular/material/chips";
import {MatBadgeModule} from "@angular/material/badge";
import {SnpHeaderComponent} from "./data-template/snp-card/snp-header/snp-header.component";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";

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
        MatChipsModule,
        MatBadgeModule,
        MatSortModule,
        MatPaginatorModule,
    ],
    declarations: [
        SearchComponent,
        AsbFooterComponent,
        AsbHeaderComponent,
        LayoutComponent,
        AsbTableComponent,
        AsbSnpCardComponent,
        AsbElevationDirective,
        SnpButtonsComponent,
        SnpHeaderComponent,
    ],
    exports: [
        SearchComponent,
        LayoutComponent,
        AsbTableComponent,
        AsbSnpCardComponent,
        AsbElevationDirective,
        SnpHeaderComponent
    ],
})
export class AsbHelpersModule {
}
