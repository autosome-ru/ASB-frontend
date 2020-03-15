import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SearchPageComponent} from "src/app/modules/search-page/search-page.component";
import {AsbHelpersModule} from "src/app/modules/helpers/helpers.module";
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AsbHelpersModule,
        MatCardModule,
        MatExpansionModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatButtonToggleModule,
        MatTooltipModule,
        MatPaginatorModule,
    ],
    declarations: [
        SearchPageComponent,
    ],
    exports: [SearchPageComponent],
})
export class AsbSearchPageModule {
}
