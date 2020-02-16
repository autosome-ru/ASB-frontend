import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SearchPageComponent} from "src/app/modules/search-page/search-page.component";
import {AsbHelpersModule} from "src/app/modules/helpers/helpers.module";
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {SearchComponent} from "../helpers/search-template/search.component";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

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
    ],
    declarations: [
        SearchPageComponent,
        SearchComponent,
    ],
    exports: [SearchPageComponent, SearchComponent],
})
export class AsbSearchPageModule {
}
