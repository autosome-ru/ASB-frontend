import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TicketPageComponent} from './ticket-page.component';
import {CloseDialogOnRouteService} from "../../../interceptors/popup-interceptor";

const routes: Routes = [
  {
    path: '',
    canDeactivate: [CloseDialogOnRouteService],
    component: TicketPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketPageRoutingModule { }
