import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('src/app/modules/pages/snp-annotation-main/snp-annotation-main.module').then(
            mod => mod.SnpAnnotationMainModule
        ),
        data: {
            title: "ANANASTRA",
            description: ""
        }
    },
    {
        path: 'ticket/:id',
        loadChildren: () => import('src/app/modules/pages/ticket-page/ticket-page.module').then(
            mod => mod.TicketPageModule
        )
    },
    {
        path: "404",
        loadChildren: () => import(
            "src/app/modules/pages/404-page/page-not-found.module").then(mod => mod.AsbPageNotFoundModule),
        data: {
            title: "Page not found",
            description: "Page not found"
        }
    },
    {
        path: '**',
        redirectTo: '404'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
