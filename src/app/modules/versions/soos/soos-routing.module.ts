import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
    {
        path: "",
        loadChildren: () => import(
            "../../home-page/home-page.module").then(mod => mod.AsbHomePageModule),
        data: {
            title: "ADASTRA - Allelic Dosage corrected Allele-Specific human Transcription factor binding sites",
            description: "The database of allele-specific binding sites recognized by human transcription factors based on alignments of the ChIP-Seq data from GTRD"
        }
    },
    {
        path: "about",
        loadChildren: () => import(
            "../../about-page/about-page.module").then(mod => mod.AsbAboutPageModule),
        data: {
            title: "ADASTRA - about",
            description: "The database of allele-specific binding sites recognized by human transcription factors based on alignments of the ChIP-Seq data from GTRD"
        }
    },
    {
        path: "downloads",
        loadChildren: () => import(
            "../../downloads-page/downloads-page.module").then(mod => mod.AsbDownloadsPageModule),
        data: {
            title: "ADASTRA - downloads",
            description: "The database of allele-specific binding sites recognized by human transcription factors based on alignments of the ChIP-Seq data from GTRD"
        }
    },
    {
        path: "browse",
        loadChildren: () => import(
            "../../browse-page/browse-page.module").then(mod => mod.AsbBrowsePageModule),
        data: {
            title: "ADASTRA -  browse",
            description: "Browse the database of allele-specific binding sites recognized by human transcription factors based on alignments of the ChIP-Seq data from GTRD"
        }
    },
    {
        path: "help",
        loadChildren: () => import(
            "../../help-page/help-page.module").then(mod => mod.AsbHelpPageModule),
        data: {
            title: "ADASTRA - help",
            description: "Browse the database of allele-specific binding sites recognized by human transcription factors based on alignments of the ChIP-Seq data from GTRD"
        }
    },
    {
        path: "search",
        loadChildren: () => import(
            "../../search-pages/search-page.module").then(mod => mod.AsbSearchPageModule),
        data: {
            title: "ADASTRA - search",
            description: "ADAstra search page for allele-specific binding sites recognized by human transcription factors based on alignments of the ChIP-Seq data from GTRD"
        }
    },
    {
        path: "snps/:rsId/:alt",
        loadChildren: () => import(
            "../../snp-page/snp-page.module").then(mod => mod.AsbSnpPageModule),
        data: {
            title: (id: string, version: string) => `${id} - ADASTRA ${version}`,
            description: (id: string) => `ADASTRA report for ${id} SNP`
        }
    },
    {
        path: "404",
        loadChildren: () => import(
            "../../404-page/page-not-found.module").then(mod => mod.AsbPageNotFoundModule),
        data: {
            title: "Page not found"
        }
    },
    {
        path: "/",
        redirectTo: ""
    },
    {
        path: '**',
        redirectTo: '404'
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SoosRoutingModule { }
