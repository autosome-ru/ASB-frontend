import {NgModule} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {StoreModule} from "@ngrx/store";
import {asbAppReducer, asbAppEffects} from "./store";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "src/environments/environment";
import {AsbAppIconsModule} from "./helpers/svgIcon";
import {BrowserModule} from "@angular/platform-browser";
import {AsbRoutingModule} from "./asb-routing.module";
import {AppComponent} from "./app.component";
import {ToastrModule} from "ngx-toastr";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

import {ReleasesWrapperModule} from "./releases-wrapper/releases-wrapper.module";
import {JoyrideModule} from "ngx-joyride";
import {AsbLayoutsModule} from "./modules/helpers/layout-template/layout.module";

import {DataService} from "./services/data.service";
import {SearchService} from "./services/search.service";
import {SeoService} from "./services/seo.servise";
import {ReleasesService} from "./services/releases.service";

import {ErrorsInterceptor} from "./interceptors/errors-interceptor";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MAT_CHIPS_DEFAULT_OPTIONS} from "@angular/material/chips";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule.withServerTransition({appId: "serverApp"}),
        BrowserAnimationsModule,
        StoreModule.forRoot(asbAppReducer),
        EffectsModule.forRoot(asbAppEffects),
        ToastrModule.forRoot(),
        JoyrideModule.forRoot(),
        environment.production ? [] : StoreDevtoolsModule.instrument(),
        AsbRoutingModule,
        AsbAppIconsModule,
        ReleasesWrapperModule,
        AsbLayoutsModule,

    ],
  providers: [
      DataService,
      SearchService,
      SeoService,
      ReleasesService,
      {
          provide: MAT_CHIPS_DEFAULT_OPTIONS,
          useValue: {
              separatorKeyCodes: [ENTER, COMMA]
          }
      },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
