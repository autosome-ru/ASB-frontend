import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AsbElevationDirective} from "./elevation.directive";

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        AsbElevationDirective,
    ],
    exports: [
        AsbElevationDirective
    ],
    providers: [],
})
export class AsbDirectivesModule {
}
