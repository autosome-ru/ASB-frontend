import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AutocompleteSearchComponent} from "./autocomplete-search/autocomplete-search.component";



@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [AutocompleteSearchComponent],
    exports: [AutocompleteSearchComponent]
})
export class AsbHelpersModule {
}
