import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DownloadsPageComponent} from "./downloads-page.component";


const routes: Routes = [
    {
        path: "",
        component: DownloadsPageComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AsbDownloadsPageRoutingModule { }
