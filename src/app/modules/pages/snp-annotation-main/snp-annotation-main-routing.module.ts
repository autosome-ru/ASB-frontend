import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SnpAnnotationMainComponent} from './snp-annotation-main.component';

const routes: Routes = [
  {
    component: SnpAnnotationMainComponent,
    path: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SnpAnnotationMainRoutingModule { }
