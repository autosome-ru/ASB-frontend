import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {LayoutComponent} from "./layout.component";
import {AsbFooterComponent} from "./footer/footer.component";
import {AsbHeaderComponent} from "./header/header.component";


@NgModule({
    imports: [
        CommonModule,
        RouterModule,

    ],
    declarations: [
        AsbFooterComponent,
        AsbHeaderComponent,
        LayoutComponent,
    ],
    exports: [
        LayoutComponent,

    ],
    providers: [],
})
export class AsbLayoutsModule {
}
