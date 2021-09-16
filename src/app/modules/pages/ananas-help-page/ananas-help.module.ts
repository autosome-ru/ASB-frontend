import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnanasHelpRoutingModule } from './ananas-help-routing.module';
import { AnanasHelpComponent } from './ananas-help.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDividerModule} from "@angular/material/divider";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
    declarations: [AnanasHelpComponent],
    exports: [
        AnanasHelpComponent
    ],
    imports: [
        CommonModule,
        AnanasHelpRoutingModule,
        MatExpansionModule,
        MatDividerModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule
    ],
})
export class AnanasHelpModule { }
