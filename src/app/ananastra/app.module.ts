import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AsbAppIconsModule} from '../helpers/svg-icons-sanitizer';
import {MatIconModule} from '@angular/material/icon';
import {UploadService} from '../services/upload.service';
import {EffectsModule} from '@ngrx/effects';
import {ToastrModule} from 'ngx-toastr';
import {StoreModule} from '@ngrx/store';
import {ProcessingService} from '../services/processing.service';
import {ScriptService} from '../services/script.service';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {UrlService} from "../services/url.service";
import {ReleasesService} from "../services/releases.service";
import {annotationStoreEffects} from "../store/effect/ananastra";
import {annotationStoreReducer} from "../store/reducer/ananastra";
import {AsbPopoverComponent} from "../modules/shared/popover-template/popover.component";
import {FormFieldsModule} from "../modules/shared/form-fields/form-fields.module";
import {AsbConfirmDialogComponent} from "../modules/shared/popover-template/confirm-dialog/confirm-dialog.component";
import {DataService} from "../services/data.service";
import {JoyrideModule} from "ngx-joyride";
import {AnanastraHeaderModule} from "../modules/shared/ananastra-header/ananastra-header.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ErrorsInterceptor} from "../interceptors/errors-interceptor";

@NgModule({
    declarations: [
        AppComponent,
        AsbPopoverComponent,
        AsbConfirmDialogComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(annotationStoreReducer),
        EffectsModule.forRoot(annotationStoreEffects),
        ToastrModule.forRoot(),
        JoyrideModule.forRoot(),
        AppRoutingModule,
        AsbAppIconsModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        FormFieldsModule,
        AnanastraHeaderModule
    ],
    providers: [
        ProcessingService,
        UploadService,
        ScriptService,
        ReleasesService,
        DataService,
        UrlService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorsInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
