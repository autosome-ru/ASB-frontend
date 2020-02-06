import {NgModule} from "@angular/core";
import {AsbAppComponent} from "./asb-app.component";
import { AsbAppRoutingModule } from "./asb-app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import {StoreModule} from "@ngrx/store";
import {asbAppReducer, asbAppEffects} from "./store";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import {MatSnackBarModule} from "@angular/material";
import {AsbHomePageModule} from "./modules/home-page/home-page.module";
import {AsbPageNotFoundModule} from "./modules/page-not-found/page-not-found.module";
import {AsbSharedPageModule} from "./modules/page-template/page-template.module";
import {AsbAboutUsPageModule} from "./modules/about-us/about-us.module";
import {AsbAppIconsModule} from "./helpers/svgIcon";
import {AsbHelpersModule} from "./modules/helpers/helpers.module";


@NgModule({
    declarations: [
        AsbAppComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        StoreModule.forRoot(asbAppReducer),
        EffectsModule.forRoot(asbAppEffects),
        environment.production ? [] : StoreDevtoolsModule.instrument(),
        ToastrModule.forRoot(),
        MatSnackBarModule,
        AsbAppRoutingModule,
        AsbHomePageModule,
        AsbPageNotFoundModule,
        AsbSharedPageModule,
        AsbAboutUsPageModule,
        AsbAppIconsModule,
        AsbHelpersModule,
    ],
    providers: [
        // here will be services
    ],
    bootstrap: [ AsbAppComponent],
})
export class AsbAppModule {
}
