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
import {AsbMotifsComponent} from './asb-motifs/asb-motifs.component';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
    declarations: [
        TicketPageComponent,
        AsbMotifsComponent,
        TicketStatsComponent,
        TicketTablePreviewComponent
    ],
    imports: [
        CommonModule,
        MatExpansionModule,
        TicketPageRoutingModule,
        MatProgressSpinnerModule,
        ChartsModule,
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
        SciNotationModule
    ],
  providers: [DownloadService]
})
export class TicketPageModule { }
