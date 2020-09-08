import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomePageComponent} from "./home-page.component";
import {CloseDialogOnRouteService} from "../../../interceptors/popup-interceptor";


const routes: Routes = [
    {
        path: "",
        component: HomePageComponent,
        canDeactivate: [CloseDialogOnRouteService],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AsbHomePageRoutingModule { }
