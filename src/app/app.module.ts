import {NgModule} from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import {StoreModule} from "@ngrx/store";
import {asbAppReducer, asbAppEffects} from "./store";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "src/environments/environment";
import {AsbHomePageModule} from "./modules/home-page/home-page.module";
import {AsbPageNotFoundModule} from "./modules/404-page/page-not-found.module";
import {AsbAboutUsPageModule} from "./modules/about-us-page/about-us.module";
import {AsbAppIconsModule} from "./helpers/svgIcon";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {AsbSearchPageModule} from "src/app/modules/search-page/search-page.module";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {AsbHelpersModule} from "./modules/helpers/helpers.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
      BrowserAnimationsModule,
      StoreModule.forRoot(asbAppReducer),
      EffectsModule.forRoot(asbAppEffects),
      environment.production ? [] : StoreDevtoolsModule.instrument(),
      ToastrModule.forRoot(),
      BrowserModule.withServerTransition({ appId: 'serverApp' }),
      MatSnackBarModule,
      AsbHomePageModule,
      AsbPageNotFoundModule,

      AsbAboutUsPageModule,
      AsbAppIconsModule,
      AsbSearchPageModule,
      AppRoutingModule,
      AsbHelpersModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
