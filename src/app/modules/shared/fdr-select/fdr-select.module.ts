import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FdrSelectComponent } from './fdr-select.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
    declarations: [FdrSelectComponent],
    exports: [
        FdrSelectComponent
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule
    ]
})
export class FdrSelectModule { }
