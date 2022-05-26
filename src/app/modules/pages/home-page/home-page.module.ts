import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomePageComponent} from "./home-page.component";
import {AsbHomePageRoutingModule} from "./home-page-routing.module";
import {AsbTourModule} from "../../shared/tour-template/tour-module";
import {AsbSearchModule} from "../../shared/search-template/search.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ArticleCiteModule} from "../../shared/article-cite/article-cite.module";
import {MatTooltipModule} from "@angular/material/tooltip";
import {NewsSectionModuleModule} from "../../shared/news-section/news-section.module";

@NgModule({
    imports: [
        CommonModule,
        AsbHomePageRoutingModule,
        AsbTourModule,
        AsbSearchModule,
        MatProgressSpinnerModule,
        ArticleCiteModule,
        MatTooltipModule,
        NewsSectionModuleModule,
    ],
    declarations: [HomePageComponent],
})
export class AsbHomePageModule {
}
