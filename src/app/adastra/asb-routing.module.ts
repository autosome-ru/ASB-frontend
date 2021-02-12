import { NgModule } from "@angular/core";
import {Routes, RouterModule, ExtraOptions} from "@angular/router";
import {RecentComponent} from "../modules/releases-wrapper/recent.component";
import {RedirectReleaseComponent} from "../modules/releases-wrapper/redirect-release.component";
import {DeprecatedComponent} from "../modules/releases-wrapper/deprecated.component";

const routerOptions: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 20],
    initialNavigation: 'enabled',
    relativeLinkResolution: 'legacy'
}

// Use RecentComponent for recent release and DeprecatedComponent for deprecated one
const routes: Routes = [
    {
        path: "soos",
        component: DeprecatedComponent,
        loadChildren: () => import("src/app/modules/releases/deprecated/soos/soos.module").then(mod => mod.SoosModule)
    },
    {
        path: "ford",
        component: RecentComponent,
        loadChildren: () => import("src/app/modules/releases/deprecated/ford/ford.module").then(mod => mod.FordModule)
    },
    {
        path: "dan",
        component: DeprecatedComponent,
        loadChildren: () => import("src/app/modules/releases/dan/dan.module").then(mod => mod.DanModule)
    },
    {
        path: "beta",
        component: DeprecatedComponent,
        loadChildren: () => import("src/app/modules/releases/deprecated/test/test.module").then(mod => mod.TestModule)
    },

    {
        path: "",
        pathMatch: "full",
        redirectTo: "dan",
    },

    {
        path: "**",
        component: RedirectReleaseComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AsbRoutingModule { }
