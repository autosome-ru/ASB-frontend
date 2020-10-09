import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {AboutPageComponent} from "./about-page.component";
import {AsbAboutPageRoutingModule} from "./about-page-routing.module";
import {ArticleCiteModule} from "../../shared/article-cite/article-cite.module";

@NgModule({
    imports: [
        CommonModule,
        AsbAboutPageRoutingModule,
        ArticleCiteModule
    ],
    declarations: [AboutPageComponent],
})
export class AsbAboutPageModule {
}
