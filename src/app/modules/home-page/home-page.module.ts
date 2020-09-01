import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomePageComponent} from "./home-page.component";
import {AsbHomePageRoutingModule} from "./home-page-routing.module";
import {AsbTourModule} from "../helpers/tour-template/tour-module";
import {AsbSearchModule} from "../helpers/search-template/search.module";

@NgModule({
    imports: [
        CommonModule,
        AsbHomePageRoutingModule,
        AsbTourModule,
        AsbSearchModule,
    ],
    declarations: [HomePageComponent],
})
export class AsbHomePageModule {
}
