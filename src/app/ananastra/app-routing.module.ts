import {NgModule} from '@angular/core';
import {Routes, RouterModule, ExtraOptions} from '@angular/router';
const routerOptions: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 20],
    initialNavigation: 'enabled',
    relativeLinkResolution: 'legacy'
}
const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('src/app/modules/pages/snp-annotation-main/snp-annotation-main.module').then(
            mod => mod.SnpAnnotationMainModule
        ),
        data: {
            title: "ANANASTRA - Anotation and enrichment Analysis of Allele-Specific Transcription factor binding at SNPs",
            description: ""
        }
    },
    {
        path: 'portal',
        loadChildren: () => import('src/app/modules/pages/snp-annotation-main/snp-annotation-main.module').then(
            mod => mod.SnpAnnotationMainModule
        ),
        data: {
            title: "ANANASTRA - Anotation and enrichment Analysis of Allele-Specific Transcription factor binding at SNPs",
            description: ""
        }
    },
    {
        path: 'ticket/:id',
        loadChildren: () => import('src/app/modules/pages/ticket-page/ticket-page.module').then(
            mod => mod.TicketPageModule
        ),
        data: {
            title: (ticket: string) => `ANANASTRA - ${ticket}`,
            description: ""
        }
    },
    {
        path: 'about',
        loadChildren: () => import('src/app/modules/pages/about-page/about-page.module').then(
            mod => mod.AsbAboutPageModule
        ),
        data: {
            ananas: true,
            title: "ANANASTRA - About",
            description: ""
        }
    },
    {
        path: 'help',
        loadChildren: () => import('src/app/modules/pages/ananas-help-page/ananas-help.module').then(
            mod => mod.AnanasHelpModule
        ),
        data: {
            title: "ANANASTRA - Help",
            description: ""
        }
    },
    {
        path: "data",
        loadChildren: () => import(
            "src/app/modules/pages/browse-page/browse-page.module").then(mod => mod.AsbBrowsePageModule),
        data: {
            title: "ANANASTRA - browse",
            isAnanas: true,
            description: "Browse the database of allele-specific binding sites recognized by human transcription factors based on alignments of the ChIP-Seq data from GTRD"
        }

    },
    {
        path: "404",
        loadChildren: () => import(
            "src/app/modules/pages/404-page/page-not-found.module").then(
                mod => mod.AsbPageNotFoundModule),
        data: {
            title: "ANANASTRA - Page not found",
            description: "Page not found"
        }
    },
    {
        path: '**',
        redirectTo: '404'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
