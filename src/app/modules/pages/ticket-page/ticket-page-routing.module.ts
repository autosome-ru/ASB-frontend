import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TicketPageComponent} from './ticket-page.component';

const routes: Routes = [
  {
    path: '',
    component: TicketPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketPageRoutingModule { }
