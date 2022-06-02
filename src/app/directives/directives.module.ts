import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AsbElevationDirective} from "./elevation.directive";
import {OnlyLatinDirective} from "./only-latin.directive";
import {DragDropDirective} from "./drag-n-drop.directive";

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        AsbElevationDirective,
        OnlyLatinDirective,
        DragDropDirective
    ],
    exports: [
        AsbElevationDirective,
        OnlyLatinDirective,
        DragDropDirective
    ],
    providers: [],
})
export class AsbDirectivesModule {
}
