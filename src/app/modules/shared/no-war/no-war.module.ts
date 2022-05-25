import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoWarComponent } from './no-war.component';



@NgModule({
    declarations: [
        NoWarComponent
    ],
    exports: [
        NoWarComponent
    ],
    imports: [
        CommonModule
    ]
})
export class NoWarModule { }
