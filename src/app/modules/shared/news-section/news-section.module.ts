import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NewsSectionComponent} from "./news-section.component";

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [NewsSectionComponent],
    exports: [
        NewsSectionComponent
    ]
})
export class NewsSectionModuleModule {
}
