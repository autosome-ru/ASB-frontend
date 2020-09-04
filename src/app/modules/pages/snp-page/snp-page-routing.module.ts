import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SnpPageComponent} from "./snp-page.component";



const routes: Routes = [
    {
        path: "",
        component: SnpPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AsbSnpPageRoutingModule { }
