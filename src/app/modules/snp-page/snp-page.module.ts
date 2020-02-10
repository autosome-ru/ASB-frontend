import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AsbHelpersModule} from "src/app/modules/helpers/helpers.module";
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {SnpPageComponent} from "./snp-page.component";
import {MatListModule} from "@angular/material/list";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AsbHelpersModule,
        MatCardModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatListModule,
    ],
    declarations: [SnpPageComponent],
    exports: [SnpPageComponent],
})
export class AsbSnpPageModule {
}
