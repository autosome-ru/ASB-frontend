import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomePageComponent} from "./home-page.component";
import {AsbHomePageRoutingModule} from "./home-page-routing.module";
import {AsbTourModule} from "../../helpers/tour-template/tour-module";
import {AsbSearchModule} from "../../helpers/search-template/search.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
    imports: [
        CommonModule,
        AsbHomePageRoutingModule,
        AsbTourModule,
        AsbSearchModule,
        MatProgressSpinnerModule,
    ],
    declarations: [HomePageComponent],
})
export class AsbHomePageModule {
}
