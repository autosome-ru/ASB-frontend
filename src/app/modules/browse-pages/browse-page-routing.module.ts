import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BrowseTfPageComponent} from "./tf-page/browse-tf-page.component";
import {BrowseClPageComponent} from "./cl-page/browse-cl-page.component";

const routes: Routes = [
    {
        path: "cl",
        component: BrowseClPageComponent
    },
    {
        path: "tf",
        component: BrowseTfPageComponent,
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AsbBrowsePageRoutingModule { }
