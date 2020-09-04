import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PageNotFoundComponent} from "./page-not-found.component";
import {AsbPageNotFoundRoutingModel} from "./page-not-found-routing.model";


@NgModule({
    imports: [
        CommonModule,
        AsbPageNotFoundRoutingModel
    ],
    declarations: [PageNotFoundComponent],
    exports: [PageNotFoundComponent]
})
export class AsbPageNotFoundModule {
}
