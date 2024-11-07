import { NgModule } from "@angular/core";
import {Routes, RouterModule, ExtraOptions} from "@angular/router";
import {RecentComponent} from "../modules/releases-wrapper/recent.component";
import {RedirectReleaseComponent} from "../modules/releases-wrapper/redirect-release.component";
import {DeprecatedComponent} from "../modules/releases-wrapper/deprecated.component";
import {RemovedComponent} from "../modules/releases-wrapper/removed.component";
import {recentRelease, releasesList} from "../helpers/constants/releases";
import {FutureComponent} from "../modules/releases-wrapper/future.component";


const routerOptions: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 20],
    initialNavigation: 'enabled',
    relativeLinkResolution: 'legacy'
};

const componentMap = {
    recent: RecentComponent,
    deprecated: RemovedComponent,
    legacy: DeprecatedComponent,
    future: FutureComponent,
};

const releaseMap = new Map(
    releasesList.map(object => {
        return [object.url, componentMap[object.releaseType]];
    }),
);
const routes: Routes = [
    {
        path: "soos",
        component: releaseMap.get('soos'),
        loadChildren: () => import("src/app/modules/releases/deprecated/soos/soos.module").then(mod => mod.SoosModule)
    },
    {
        path: "susan",
        component: releaseMap.get('susan'),
        loadChildren: () => import("src/app/modules/releases/removed/susan/susan.module").then(mod => mod.SusanModule)
    },
    {
        path: "zanthar",
        component: releaseMap.get('zanthar'),
        loadChildren: () => import("src/app/modules/releases/removed/zanthar/zanthar.module").then(mod => mod.ZantharModule)
    },
    {
        path: "mabel",
        component: releaseMap.get('mabel'),
        loadChildren: () => import("src/app/modules/releases/bill-cipher/bill-cipher.module").then(mod => mod.BillCipherModule)
    },
    {
        path: "bill-cipher",
        component: releaseMap.get('bill-cipher'),
        loadChildren: () => import("src/app/modules/releases/bill-cipher/bill-cipher.module").then(mod => mod.BillCipherModule)
    },
    {
        path: "",
        pathMatch: "full",
        redirectTo: `/${recentRelease.url}`,
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
