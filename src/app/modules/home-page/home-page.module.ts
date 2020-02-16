import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomePageComponent} from "./home-page.component";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {AsbHelpersModule} from "../helpers/helpers.module";

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        ReactiveFormsModule,
        AsbHelpersModule,
    ],
    declarations: [HomePageComponent],
    exports: [HomePageComponent],
})
export class AsbHomePageModule {
}
