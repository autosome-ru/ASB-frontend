import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {StepTemplateComponent} from "./step-template/step-template.component";
import {AsbTourComponent} from "./tour-template.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {AsbDirectivesModule} from "../../../directives/directives.module";



@NgModule({
    imports: [
        CommonModule,
        MatTooltipModule,
        MatButtonModule,
        MatIconModule,
        AsbDirectivesModule,
    ],
    declarations: [
        StepTemplateComponent,
        AsbTourComponent
    ],
    exports: [
        StepTemplateComponent,
        AsbTourComponent

    ],
    providers: [],
})
export class AsbTourModule {
}
