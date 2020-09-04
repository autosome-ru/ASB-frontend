import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SearchPageComponent} from "src/app/modules/pages/search-pages/search-page.component";
import {AsbTablesModule} from "src/app/modules/helpers/table-template/table.module";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatPaginatorModule} from "@angular/material/paginator";
import {AsbSearchPageRoutingModule} from "./search-page-routing.module";
import {SearchPageTableComponent} from "./search-table/search-table.component";
import {JoyrideModule} from "ngx-joyride";
import {AsbTourModule} from "../../helpers/tour-template/tour-module";
import {AsbSnpDataModule} from "../../helpers/data-template/data.module";
import {AsbDirectivesModule} from "../../helpers/directives/directives.module";
import {AsbSearchModule} from "../../helpers/search-template/search.module";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AsbTablesModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatButtonToggleModule,
        MatTooltipModule,
        MatPaginatorModule,
        AsbSearchPageRoutingModule,
        JoyrideModule.forChild(),
        AsbTourModule,
        AsbSnpDataModule,
        AsbDirectivesModule,
        AsbSearchModule,
        MatCardModule,
    ],
    declarations: [
        SearchPageComponent,
        SearchPageTableComponent,
    ],
})
export class AsbSearchPageModule {
}
