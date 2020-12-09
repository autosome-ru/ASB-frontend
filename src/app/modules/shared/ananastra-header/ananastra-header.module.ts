import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnanastraHeaderComponent } from './ananastra-header.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatRippleModule} from "@angular/material/core";
import {JoyrideModule} from "ngx-joyride";
import {AsbTourModule} from "../tour-template/tour-module";



@NgModule({
    declarations: [AnanastraHeaderComponent],
    exports: [
        AnanastraHeaderComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MatListModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatRippleModule,
        JoyrideModule,
        AsbTourModule
    ]
})
export class AnanastraHeaderModule { }
