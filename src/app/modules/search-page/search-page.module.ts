import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SearchPageComponent} from "src/app/modules/search-page/search-page.component";
import {AsbHelpersModule} from "src/app/modules/helpers/helpers.module";
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AsbHelpersModule,
        MatCardModule,
        MatExpansionModule,
        MatCheckboxModule,
    ],
    declarations: [SearchPageComponent],
    exports: [SearchPageComponent],
})
export class AsbSearchPageModule {
}
