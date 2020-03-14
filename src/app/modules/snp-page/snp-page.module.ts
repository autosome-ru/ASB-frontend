import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AsbHelpersModule} from "src/app/modules/helpers/helpers.module";
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {SnpPageComponent} from "./snp-page.component";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatInputModule} from "@angular/material/input";
import {AsbStatisticsComponent} from "./statistics/statistics.component";
import { PhenotypesComponent } from './phenotypes/phenotypes.component';
import { InnerTableComponent } from './inner-table/inner-table.component';
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatExpansionModule,
        MatSelectModule,
        MatTabsModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatInputModule,
        AsbHelpersModule,
        MatPaginatorModule,
    ],
    declarations: [SnpPageComponent, AsbStatisticsComponent, PhenotypesComponent, InnerTableComponent],
    exports: [SnpPageComponent, InnerTableComponent],
})
export class AsbSnpPageModule {
}
