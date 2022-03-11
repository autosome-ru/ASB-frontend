import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InnerTableComponent} from "./inner-snp-table/inner-table.component";
import {SciNotationModule} from "../sci-notation/sci-notation.module";
import {AsbTablesModule} from "../table-template/table.module";



@NgModule({
    declarations: [
        InnerTableComponent,
    ],
    exports: [
        InnerTableComponent
    ],
    imports: [
        CommonModule,
        SciNotationModule,
        AsbTablesModule
    ]
})
export class InnerTableModule { }
