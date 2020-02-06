import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AsbPageNotFoundComponent} from "./page-not-found.component";


@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [AsbPageNotFoundComponent],
    exports: [AsbPageNotFoundComponent]
})
export class AsbPageNotFoundModule {
}
