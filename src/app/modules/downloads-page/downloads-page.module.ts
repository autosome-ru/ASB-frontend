import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DownloadsPageComponent} from "./downloads-page.component";
import {AsbDownloadsPageRoutingModule} from "./downloads-page-routing.module";

@NgModule({
    imports: [
        CommonModule,
        AsbDownloadsPageRoutingModule
    ],
    declarations: [DownloadsPageComponent],
})
export class AsbDownloadsPageModule {
}
