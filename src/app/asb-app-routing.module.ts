import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {AsbPageNotFoundComponent} from "./modules/page-not-found/page-not-found.component";
import {AsbHomePageComponent} from "./modules/home-page/home-page.component";

const routes: Routes = [
    {
        path: "",
        component: AsbHomePageComponent,
    },
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
