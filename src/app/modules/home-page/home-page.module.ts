import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomePageComponent} from "./home-page.component";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {AsbHelpersModule} from "../helpers/helpers.module";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        ReactiveFormsModule,
        AsbHelpersModule,
        LazyLoadImageModule,
        RouterModule
    ],
    declarations: [HomePageComponent],
    exports: [HomePageComponent],
})
export class AsbHomePageModule {
}
