import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AnanasHelpComponent} from "./ananas-help.component";
import {CloseDialogOnRouteService} from "../../../interceptors/popup-interceptor";

const routes: Routes = [
    {
        path: '',
        canDeactivate: [CloseDialogOnRouteService],
        component: AnanasHelpComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnanasHelpRoutingModule { }
