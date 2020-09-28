import { NgModule } from "@angular/core";
import {Routes, RouterModule, ExtraOptions} from "@angular/router";
import {RecentComponent} from "./modules/releases-wrapper/recent.component";
import {RedirectComponent} from "./modules/releases-wrapper/redirect.component";
import {DeprecatedComponent} from "./modules/releases-wrapper/deprecated.component";

const routerOptions: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 20],
    initialNavigation: 'enabled'
};

// Use RecentComponent for recent release and DeprecatedComponent for deprecated one
const routes: Routes = [
    {
        path: "soos",
        component: RecentComponent,
        loadChildren: () => import("src/app/modules/releases/soos/soos.module").then(mod => mod.SoosModule)
    },
    {
        path: "beta",
        component: DeprecatedComponent,
        loadChildren: () => import("src/app/modules/releases/deprecated/test/test.module").then(mod => mod.TestModule)
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
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AsbRoutingModule { }
