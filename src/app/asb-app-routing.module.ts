import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {AsbPageNotFoundComponent} from "./modules/page-not-found/page-not-found.component";
import {AsbHomePageComponent} from "./modules/home-page/home-page.component";
import {AsbAboutUsComponent} from "./modules/about-us/asb-about-us.component";
import {AsbSearchPageComponent} from "@app/modules/search-page/asb-search-page.component";

const routes: Routes = [
    {
        path: "",
        component: AsbHomePageComponent,
    },
    {
        path: "about-us",
        component: AsbAboutUsComponent,
    },
    // {
    //     path: "search",
    //     component: AsbSearchPageComponent,
    //
    // },
    {
        path: "**",
        component: AsbPageNotFoundComponent,

    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AsbAppRoutingModule {
}
