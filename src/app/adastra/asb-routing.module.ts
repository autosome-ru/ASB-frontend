import { NgModule } from "@angular/core";
import {Routes, RouterModule, ExtraOptions} from "@angular/router";
import {RecentComponent} from "../modules/releases-wrapper/recent.component";
import {RedirectReleaseComponent} from "../modules/releases-wrapper/redirect-release.component";
import {DeprecatedComponent} from "../modules/releases-wrapper/deprecated.component";
import {RemovedComponent} from "../modules/releases-wrapper/removed.component";

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
        path: "susan",
        component: RemovedComponent,
        loadChildren: () => import("src/app/modules/releases/removed/susan/susan.module").then(mod => mod.SusanModule)
    },
    {
        path: "zanthar",
        component: RecentComponent,
        loadChildren: () => import("src/app/modules/releases/removed/zanthar/zanthar.module").then(mod => mod.ZantharModule)
    },
    {
        path: "bill-cipher",
        component: RecentComponent,
        loadChildren: () => import("src/app/modules/releases/removed/zanthar/zanthar.module").then(mod => mod.ZantharModule)
    },
    {
        path: "",
        pathMatch: "full",
        redirectTo: "zanthar",
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
