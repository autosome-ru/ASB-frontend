import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnanasHelpRoutingModule } from './ananas-help-routing.module';
import { AnanasHelpComponent } from './ananas-help.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDividerModule} from "@angular/material/divider";


@NgModule({
  declarations: [AnanasHelpComponent],
    imports: [
        CommonModule,
        AnanasHelpRoutingModule,
        MatExpansionModule,
        MatDividerModule
    ]
})
export class AnanasHelpModule { }
