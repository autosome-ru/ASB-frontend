import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchPageComponent} from "./modules/search-page/search-page.component";
import {HomePageComponent} from "./modules/home-page/home-page.component";
import {AboutUsComponent} from "./modules/about-us-page/about-us.component";
import {PageNotFoundComponent} from "./modules/404-page/page-not-found.component";


const routes: Routes = [
    {
        path: "",
        component: HomePageComponent,
        data: {
            title: "ASB home page"
        }
    },
    {
        path: "about-us-page",
        component: AboutUsComponent,
        data: {
            title: "ASB about-us-page"
        }
    },
    {
        path: "search",
        component: SearchPageComponent,
        data: {
            title: "ASB-search"
        }

    },
    {
        path: "search/:id",
        component: SearchPageComponent,
        data: {
            title: "ASB-search"
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
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
