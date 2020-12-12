import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnanasHelpRoutingModule } from './ananas-help-routing.module';
import { AnanasHelpComponent } from './ananas-help.component';


@NgModule({
  declarations: [AnanasHelpComponent],
  imports: [
    CommonModule,
    AnanasHelpRoutingModule
  ]
})
export class AnanasHelpModule { }
