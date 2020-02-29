import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import {LayoutComponent} from "./layout-template/layout.component";
import {AsbFooterComponent} from "./layout-template/footer/footer.component";
import {AsbHeaderComponent} from "./layout-template/header/header.component";
import { AsbTableComponent } from './table-template/table.component';
import {NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import {MatTableModule} from "@angular/material/table";
import { AsbSnpCardComponent } from './data-template/snp-card/snp-card.component';
import {AsbElevationDirective} from "./elevation.directive";
import {SnpButtonsComponent} from "./data-template/snp-card/snp-buttons/snp-buttons.component";
import {AsbSnpHeaderComponent} from "./data-template/snp-card/snp-header/snp-header.component";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {SearchComponent} from "./search-template/search.component";
import {AsbPopoverComponent} from "./popover-template/popover.component";
import {PortalModule} from "@angular/cdk/portal";
import {FullscreenOverlayContainer, OverlayContainer} from "@angular/cdk/overlay";

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatIconModule,
        RouterModule,
        NgbNavModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatSelectModule,
        PortalModule,
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
        AsbSnpHeaderComponent,
        AsbPopoverComponent,
    ],
    exports: [
        SearchComponent,
        LayoutComponent,
        AsbSnpCardComponent,
        AsbElevationDirective,
        AsbSnpHeaderComponent,
        AsbTableComponent,
        AsbPopoverComponent
    ],
    providers: [{provide: OverlayContainer, useClass: FullscreenOverlayContainer}],
})
export class AsbHelpersModule {
}
