import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SearchPageComponent} from "./search-page.component";
import {CloseDialogOnRouteService} from "../../../interceptors/popup-interceptor";

const routes: Routes = [
    {
        path: "simple",
        component: SearchPageComponent,
        canDeactivate: [CloseDialogOnRouteService],
    },
    {
        path: "advanced",
        component: SearchPageComponent,
        canDeactivate: [CloseDialogOnRouteService],
    },
    {
        path: "",
        pathMatch: 'full',
        redirectTo: 'simple'
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AsbSearchPageRoutingModule { }
