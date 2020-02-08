import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {AsbAboutUsComponent} from "./asb-about-us.component";

@NgModule({
    imports: [
        CommonModule,

    ],
    declarations: [AsbAboutUsComponent],
    exports: [AsbAboutUsComponent],
})
export class AsbAboutUsPageModule {
}
