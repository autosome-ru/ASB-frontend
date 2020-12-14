import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AnanasHelpComponent} from "./ananas-help.component";

const routes: Routes = [
    {
        path: '',
        component: AnanasHelpComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnanasHelpRoutingModule { }
