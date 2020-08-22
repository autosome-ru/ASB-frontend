import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SoosRoutingModule} from "./soos-routing.module";
import { SoosComponent } from './soos.component';


@NgModule({
  imports: [
    CommonModule,
    SoosRoutingModule,
  ],
  declarations: [SoosComponent]
})
export class SoosModule { }
