import { NgModule } from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {SoosComponent} from "./modules/versions/soos/soos.component";
import {DeprecatedComponent} from "./modules/versions/deprecated/deprecated.component";
import {RedirectComponent} from "./redirect.component";

const routes: Routes = [
    {
        path: "soos",
        component: SoosComponent,
        loadChildren: () => import("src/app/modules/versions/soos/soos.module").then(mod => mod.SoosModule)
    },
    {
        path: "waddles",
        component: DeprecatedComponent,
        loadChildren: () => import(`src/app/modules/versions/deprecated/deprecated.module`).then(mod => mod.DeprecatedModule)
    },

    {
        path: "**",
        component: RedirectComponent,
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AsbRoutingModule { }
