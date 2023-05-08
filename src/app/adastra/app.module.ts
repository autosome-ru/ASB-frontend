import {NgModule} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {StoreModule} from "@ngrx/store";
import {asbAppReducer, asbAppEffects} from "../store/indexes";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "src/environments/environment";
import {AsbAppIconsModule} from "../helpers/svg-icons-sanitizer";
import {BrowserModule} from "@angular/platform-browser";
import {AsbRoutingModule} from "./asb-routing.module";
import {AppComponent} from "./app.component";
import {ToastrModule} from "ngx-toastr";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

import {ReleasesWrapperModule} from "../modules/releases-wrapper/releases-wrapper.module";
import {JoyrideModule} from "ngx-joyride";
import {AsbLayoutsModule} from "../modules/shared/layout-template/layout.module";

import {DataService} from "../services/data.service";
import {SearchService} from "../services/search.service";
import {SeoService} from "../services/seo.servise";
import {ReleasesService} from "../services/releases.service";
import {ErrorsInterceptor} from "../interceptors/errors-interceptor";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MAT_CHIPS_DEFAULT_OPTIONS} from "@angular/material/chips";
import {AsbPopoverComponent} from "../modules/shared/popover-template/popover.component";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {AsbConfirmDialogComponent} from "../modules/shared/popover-template/confirm-dialog/confirm-dialog.component";
import {EncodeHttpParamsInterceptor} from "../interceptors/url-encode.interceptor";
import { ServiceWorkerModule } from '@angular/service-worker';
import {UrlService} from "../services/url.service";
import {CheckForUpdateService} from "../services/update.service";
import {CloseDialogOnRouteService} from "../interceptors/popup-interceptor";
import {NoWarModule} from "../modules/shared/no-war/no-war.module";

@NgModule({
    declarations: [
        AppComponent,
        AsbPopoverComponent,
        AsbConfirmDialogComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({appId: "serverApp"}),
        BrowserAnimationsModule,
        StoreModule.forRoot(asbAppReducer),
        EffectsModule.forRoot(asbAppEffects),
        ToastrModule.forRoot({
            preventDuplicates: true,
            includeTitleDuplicates: true
        }),
        JoyrideModule.forRoot(),
        environment.production ? [] : StoreDevtoolsModule.instrument(),
        AsbRoutingModule,
        AsbAppIconsModule,
        ReleasesWrapperModule,
        AsbLayoutsModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        NoWarModule
    ],
    providers: [
        DataService,
        UrlService,
        SearchService,
        SeoService,
        ReleasesService,
        CloseDialogOnRouteService,
        {provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: {
                hasBackdrop: true,
                closeOnNavigation: false,
            }
        },
        {
            provide: MAT_CHIPS_DEFAULT_OPTIONS,
            useValue: {
                separatorKeyCodes: [ENTER, COMMA]
            }
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorsInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: EncodeHttpParamsInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
