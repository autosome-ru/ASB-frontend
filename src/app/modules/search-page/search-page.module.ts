import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AsbSearchPageComponent} from "@app/modules/search-page/asb-search-page.component";
import {AsbHelpersModule} from "@app/modules/helpers/helpers.module";
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
    declarations: [AsbSearchPageComponent],
    exports: [AsbSearchPageComponent],
})
export class AsbSearchPageModule {
}
