import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
    {
        path: "about",
        loadChildren: () => import(
            "src/app/modules/pages/about-page/about-page.module").then(mod => mod.AsbAboutPageModule),
        data: {
            title: "UDACHA - about",
            description: "Uniform database of allele-specific chromatin accessibility based on alignments of the DNase I, ATAC-seq and FAIRE-seq data from GTRD"
        }
    },
    {
        path: "downloads",
        loadChildren: () => import(
            "src/app/modules/pages/downloads-page/downloads-page.module").then(mod => mod.AsbDownloadsPageModule),
        data: {
            title: "UDACHA - downloads",
            description: "Uniform database of allele-specific chromatin accessibility based on alignments of the DNase I, ATAC-seq and FAIRE-seq data from GTRD"
        }
    },
    {
        path: "browse",
        loadChildren: () => import(
            "src/app/modules/pages/browse-page/browse-page.module").then(mod => mod.AsbBrowsePageModule),
        data: {
            title: "UDACHA -  browse",
            description: "Browse the uniform database of allele-specific chromatin accessibility based on alignments of the DNase I, ATAC-seq and FAIRE-seq data from GTRD"
        }
    },
    {
        path: "help",
        loadChildren: () => import(
            "src/app/modules/pages/adastra-help-page/help-page.module").then(mod => mod.AsbHelpPageModule),
        data: {
            title: "UDACHA - help",
            description: "Uniform database of allele-specific chromatin accessibility based on alignments of the DNase I"
        }
    },
    {
        path: "search",
        loadChildren: () => import(
            "src/app/modules/pages/search-pages/search-page.module").then(mod => mod.AsbSearchPageModule),
        data: {
            title: (tfs: string) => "UDACHA - search" + (tfs ? ` for ${tfs}` : ''),
            description: (tfs: string) => "UDACHA search page Uniform database of allele-specific " +
                "chromatin accessibility based on alignments of the DNase I."
        }
    },
    {
        path: "snps/:rsId",
        loadChildren: () => import(
            "src/app/modules/pages/snp-page/snp-page.module").then(mod => mod.AsbSnpPageModule),
        data: {
            title: (id: string, version: string) => `${id} - UDACHA ${version}`,
            description: (id: string) => `UDACHA report for ${id} SNP`
        }
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
        path: "portal",
        loadChildren: () => import(
            "src/app/modules/pages/home-page/home-page.module").then(mod => mod.AsbHomePageModule),
        data: {
            title: "UDACHA - Allelic Dosage corrected Allele-Specific human Transcription factor binding sites",
            description: "Uniform database of allele-specific chromatin accessibility based on alignments of the DNase I, ATAC-seq and FAIRE-seq data from GTRD"
        }
    },
    {
        path: "",
        loadChildren: () => import(
            "src/app/modules/pages/home-page/home-page.module").then(mod => mod.AsbHomePageModule),
        data: {
            title: "UDACHA - Uniform database of allele-specific chromatin accessibility",
            description: "Uniform database of allele-specific chromatin accessibility based on alignments of the DNase I, ATAC-seq and FAIRE-seq data from GTRD"
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
export class BillCipherRoutingModule { }
