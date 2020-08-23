import { NgModule } from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {RecentComponent} from "./releases-wrapper/recent.component";
import {RedirectComponent} from "./releases-wrapper/redirect.component";


// Use RecentComponent for recent release and DeprecatedComponent for deprecated one
const routes: Routes = [
    {
        path: "soos",
        component: RecentComponent,
        loadChildren: () => import("src/app/modules/versions/soos/soos.module").then(mod => mod.SoosModule)
    },
    {
        path: "",
        pathMatch: "full",
        redirectTo: "soos",
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
