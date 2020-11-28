import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnanastraHeaderComponent } from './ananastra-header.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";



@NgModule({
    declarations: [AnanastraHeaderComponent],
    exports: [
        AnanastraHeaderComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ]
})
export class AnanastraHeaderModule { }
