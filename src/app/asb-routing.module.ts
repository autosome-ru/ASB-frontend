import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {PageNotFoundComponent} from "./modules/404-page/page-not-found.component";
import {SnpPageComponent} from "./modules/snp-page/snp-page.component";
import {version} from "./helpers/constants";


const routes: Routes = [
    {
        path: "",
        loadChildren: () => import(
            "./modules/home-page/home-page.module").then(mod => mod.AsbHomePageModule),
        data: {
            title: "ADASTra - Allelic Dosage corrected Allele-Specific human Transcription factor binding sites"
        }
    },
    {
        path: "browse",
        loadChildren: () => import(
            "./modules/browse-page/browse-page.module").then(mod => mod.AsbBrowsePageModule),
        data: {
            title: "ADASTra -  browse",
            description: "test"
        }
    },

    {
        path: "contacts",
        loadChildren: () => import(
            "./modules/contacts-page/contacts-page.module").then(mod => mod.AsbContactsPageModule),
        data: {
            title: "ADASTra - contacts"
        }
    },
    {
        path: "help",
        loadChildren: () => import(
            "./modules/help-page/help-page.module").then(mod => mod.AsbHelpPageModule),
        data: {
            title: "ADASTra - help"
        }
    },
    {
        path: "search",
        loadChildren: () => import(
            "./modules/search-pages/search-page.module").then(mod => mod.AsbSearchPageModule),
        data: {
            title: "ADASTra - search"
        }
    },
    {
        path: "snps/:rsId/:alt",
        component: SnpPageComponent,
        data: {
            title: (id: string) => `${id} - ADASTra ${version}`
        }
    },
    {
        path: "404",
        component: PageNotFoundComponent,
        data: {
            title: "Page not found"
        }
    },
    {
        path: "**",
        redirectTo: "/404"
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {initialNavigation: "enabled"})],
    exports: [RouterModule]
})
export class AsbRoutingModule { }
