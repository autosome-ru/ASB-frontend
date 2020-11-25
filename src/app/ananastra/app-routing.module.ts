import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('src/app/modules/pages/snp-annotation-main/snp-annotation-main.module').then(
      mod => mod.SnpAnnotationMainModule
    )
  },
  {
    path: 'ticket/:id',
    loadChildren: () => import('src/app/modules/pages/ticket-page/ticket-page.module').then(
      mod => mod.TicketPageModule
    )
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
