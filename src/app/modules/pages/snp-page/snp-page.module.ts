import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
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
import { PhenotypesComponent } from "./phenotypes/phenotypes.component";
import { ColorScalesComponent } from "./color-scales/color-scales.component";
import {AsbSnpPageRoutingModule} from "./snp-page-routing.module";
import {MatDividerModule} from "@angular/material/divider";
import {JoyrideModule} from "ngx-joyride";
import {AsbTourModule} from "../../shared/tour-template/tour-module";
import {AsbTablesModule} from "../../shared/table-template/table.module";
import {AsbSnpDataModule} from "../../shared/data-template/data.module";
import {MatTooltipModule} from "@angular/material/tooltip";
import {SciNotationModule} from "../../shared/sci-notation/sci-notation.module";
import {AsbMotifsModule} from "../../shared/asb-motifs/asb-motifs.module";
import {InnerTableModule} from "../../shared/inner-table/inner-table.module";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatExpansionModule,
        MatTabsModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatInputModule,
        AsbSnpPageRoutingModule,
        MatDividerModule,
        JoyrideModule.forChild(),
        AsbTourModule,
        AsbTablesModule,
        AsbSnpDataModule,
        MatTooltipModule,
        SciNotationModule,
        AsbMotifsModule,
        InnerTableModule,
    ],
    declarations: [
        SnpPageComponent,
        AsbStatisticsComponent,
        PhenotypesComponent,
        ColorScalesComponent,
    ]
})
export class AsbSnpPageModule {
}
