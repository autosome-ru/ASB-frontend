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
        path: 'about',
        loadChildren: () => import('src/app/modules/pages/about-page/about-page.module').then(
            mod => mod.AsbAboutPageModule
        ),
        data: {
            ananas: true
        }
    },
    {
        path: 'help',
        loadChildren: () => import('src/app/modules/pages/ananas-help-page/ananas-help.module').then(
            mod => mod.AnanasHelpModule
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
