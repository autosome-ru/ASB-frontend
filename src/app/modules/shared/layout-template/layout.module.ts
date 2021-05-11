import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {LayoutComponent} from "./layout.component";
import {AsbFooterComponent} from "./footer/footer.component";
import {AsbHeaderComponent} from "./header/header.component";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {JoyrideModule} from "ngx-joyride";
import {AsbTourModule} from "../tour-template/tour-module";


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatMenuModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        JoyrideModule,
        AsbTourModule,

    ],
    declarations: [
        AsbFooterComponent,
        AsbHeaderComponent,
        LayoutComponent,
    ],
    exports: [
        LayoutComponent,
    ],
    providers: [],
})
export class AsbLayoutsModule {
}
