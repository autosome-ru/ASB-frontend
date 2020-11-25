import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AsbMotifsComponent} from "./asb-motifs.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTooltipModule} from "@angular/material/tooltip";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {JoyrideModule} from "ngx-joyride";
import {AsbTourModule} from "../tour-template/tour-module";

@NgModule({
    imports: [
        CommonModule,
        MatExpansionModule,
        MatTooltipModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        JoyrideModule,
        AsbTourModule,

    ],
    declarations: [
        AsbMotifsComponent
    ],
    exports: [
        AsbMotifsComponent
    ],
    providers: [],
})
export class AsbMotifsModule {}
