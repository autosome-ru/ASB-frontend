import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewStarComponent } from './view-star.component';
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";



@NgModule({
    declarations: [ViewStarComponent],
    exports: [
        ViewStarComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatTooltipModule
    ]
})
export class ViewStarModule { }
