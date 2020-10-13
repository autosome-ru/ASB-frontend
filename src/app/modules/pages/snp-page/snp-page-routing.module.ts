import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SnpPageComponent} from "./snp-page.component";
import {CloseDialogOnRouteService} from "../../../interceptors/popup-interceptor";



const routes: Routes = [
    {
        path: "",
        canDeactivate: [CloseDialogOnRouteService],
        component: SnpPageComponent
    },
    {
        path: ":alt",
        canDeactivate: [CloseDialogOnRouteService],
        component: SnpPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AsbSnpPageRoutingModule { }
