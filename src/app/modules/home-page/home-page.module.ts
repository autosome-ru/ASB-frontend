import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AsbHomePageComponent} from "./home-page.component";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatToolbarModule} from "@angular/material/toolbar";

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
    ],
    declarations: [AsbHomePageComponent],
    exports: [AsbHomePageComponent],
})
export class AsbHomePageModule {
}
