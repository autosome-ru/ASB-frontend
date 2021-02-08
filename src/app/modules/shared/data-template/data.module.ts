import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AsbSnpCardComponent} from "./snp-card/snp-card.component";
import {SnpButtonsComponent} from "./snp-card/snp-buttons/snp-buttons.component";
import {AsbSnpHeaderComponent} from "./snp-card/snp-header/snp-header.component";
import {JoyrideModule} from "ngx-joyride";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {AsbTourModule} from "../tour-template/tour-module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
    imports: [
        CommonModule,
        JoyrideModule.forChild(),
        MatTooltipModule,
        MatButtonModule,
        RouterModule,
        AsbTourModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
    ],
    declarations: [
        AsbSnpCardComponent,
        SnpButtonsComponent,
        AsbSnpHeaderComponent,
    ],
    exports: [
        AsbSnpCardComponent,
        AsbSnpHeaderComponent,
    ],
    providers: [],
})
export class AsbSnpDataModule {
}
