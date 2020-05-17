import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {version} from "./helpers/constants";


const routes: Routes = [
    {
        path: "",
        loadChildren: () => import(
            "./modules/home-page/home-page.module").then(mod => mod.AsbHomePageModule),
        data: {
            title: "ADASTra - Allelic Dosage corrected Allele-Specific human Transcription factor binding sites",
            description: "The database of allele-specific binding sites recognized by human transcription factors based on alignments of the ChIP-Seq data from GTRD"
        }
    },
    {
        path: "browse",
        loadChildren: () => import(
            "./modules/browse-page/browse-page.module").then(mod => mod.AsbBrowsePageModule),
        data: {
            title: "ADASTra -  browse",
            description: "Browse the database of allele-specific binding sites recognized by human transcription factors based on alignments of the ChIP-Seq data from GTRD"
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
            title: "ADASTra - search",
            description: "ADAstra search page for allele-specific binding sites recognized by human transcription factors based on alignments of the ChIP-Seq data from GTRD"
        }
    },
    {
        path: "snps/:rsId/:alt",
        loadChildren: () => import(
            "./modules/snp-page/snp-page.module").then(mod => mod.AsbSnpPageModule),
        data: {
            title: (id: string) => `${id} - ADASTra ${version}`,
            description: (id: string) => `ADASTra report for ${id} SNP`
        }
    },
    {
        path: "404",
        loadChildren: () => import(
            "./modules/404-page/page-not-found.module").then(mod => mod.AsbPageNotFoundModule),
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
