import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SciNotationComponent } from './sci-notation.component';



@NgModule({
    declarations: [SciNotationComponent],
    exports: [
        SciNotationComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SciNotationModule { }
