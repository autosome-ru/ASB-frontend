import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BrowsePageComponent} from "./browse-page.component";

const routes: Routes = [
    {
        path: "cl",
        component: BrowsePageComponent
    },
    {
        path: "tf",
        component: BrowsePageComponent,
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AsbSearchPageRoutingModule { }
