import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {HomePageComponent} from "./modules/home-page/home-page.component";
import {ContactsComponent} from "./modules/contacts-page/contacts.component";
import {PageNotFoundComponent} from "./modules/404-page/page-not-found.component";
import {SnpPageComponent} from "./modules/snp-page/snp-page.component";


const routes: Routes = [
    {
        path: "",
        component: HomePageComponent,
        data: {
            title: "ASB home page"
        }
    },
    {
        path: "contacts",
        component: ContactsComponent,
        data: {
            title: "ASB contacts-page"
        }
    },
    {
        path: "help",
        component: ContactsComponent,
        data: {
            title: "ASB contacts-page"
        }
    },
    {
        path: "search",
        loadChildren: () => import(
            "./modules/search-page/search-page.module").then(mod => mod.AsbSearchPageModule),
        data: {
            title: "ASB-search"
        }

    },
    {
        path: "snps/:rsId/:alt",
        component: SnpPageComponent,
        data: {
            title: "ASB snp page ID "
        }
    },
    {
        path: "**",
        component: PageNotFoundComponent,
        data: {
            title: "Page not found(("
        }

    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: "enabled"
})],
  exports: [RouterModule]
})
export class AsbRoutingModule { }
