import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { AsbTableComponent } from "./table.component";
import {AsbServerTableComponent} from "./server-side/table-server.component";
import {AsbTourModule} from "../tour-template/tour-module";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {InnerTableComponent} from "./inner-snp-table/inner-table.component";

@NgModule({
    imports: [
        CommonModule,
        AsbTourModule,
        MatTableModule,
        MatSortModule,
        MatTooltipModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
    ],
    declarations: [
        AsbTableComponent,
        AsbServerTableComponent,
        InnerTableComponent,
    ],
    exports: [
        AsbTableComponent,
        AsbServerTableComponent,
        InnerTableComponent,
    ]
})
export class AsbTablesModule {
}
