import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from "@angular/material/tabs";
import { TicketPageRoutingModule } from './ticket-page-routing.module';
import { TicketPageComponent } from './ticket-page.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { TicketStatsComponent } from './ticket-stats/ticket-stats.component';
import {ChartsModule} from 'angular-bootstrap-md';
import { TicketTablePreviewComponent } from './ticket-table-preview/ticket-table-preview.component';
import {AsbTablesModule} from '../../shared/table-template/table.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {AsbPipesModule} from '../../../pipes/pipe.module';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {DownloadService} from '../../../services/download.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import {SciNotationModule} from '../../shared/sci-notation/sci-notation.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {AsbMotifsModule} from "../../shared/asb-motifs/asb-motifs.module";
import { TicketBarplotComponent } from './ticket-barplot/ticket-barplot.component';
import {MatChipsModule} from "@angular/material/chips";
import { TicketTableTmpComponent } from './ticket-table-enrichments/ticket-table-tmp.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDividerModule} from "@angular/material/divider";
import {AsbTourModule} from "../../shared/tour-template/tour-module";
import {JoyrideModule} from "ngx-joyride";
import {InnerTableModule} from "../../shared/inner-table/inner-table.module";
import { OddsBarComponent } from './odds-bar/odds-bar.component';
import {MatListModule} from "@angular/material/list";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ArticleCiteModule} from "../../shared/article-cite/article-cite.module";

@NgModule({
    declarations: [
        TicketPageComponent,
        TicketStatsComponent,
        TicketTablePreviewComponent,
        TicketBarplotComponent,
        TicketTableTmpComponent,
        OddsBarComponent
    ],
    imports: [
        CommonModule,
        MatExpansionModule,
        TicketPageRoutingModule,
        MatProgressSpinnerModule,
        ChartsModule,
        MatSnackBarModule,
        AsbTablesModule,
        MatMenuModule,
        MatProgressBarModule,
        MatButtonToggleModule,
        MatTabsModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatButtonModule,
        AsbPipesModule,
        MatIconModule,
        MatDialogModule,
        MatTooltipModule,
        SciNotationModule,
        AsbMotifsModule,
        MatChipsModule,
        MatDividerModule,
        AsbTourModule,
        JoyrideModule,
        InnerTableModule,
        ChartsModule,
        MatListModule,
        MatCheckboxModule,
        ArticleCiteModule
    ],
    providers: [DownloadService]
})
export class TicketPageModule { }
