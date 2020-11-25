import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AsbAppIconsModule} from '../helpers/svg-icons-sanitizer';
import {MatIconModule} from '@angular/material/icon';
import {UploadService} from '../services/upload.service';
import {asbAppReducer} from '../store/reducer';
import {EffectsModule} from '@ngrx/effects';
import {asbAppEffects} from '../store/effect';
import {ToastrModule} from 'ngx-toastr';
import {StoreModule} from '@ngrx/store';
import {ProcessingService} from '../services/processing.service';
import {ScriptService} from '../services/script.service';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {UrlService} from "../services/url.service";
import {DataService} from "../services/data.service";
import {SearchService} from "../services/search.service";
import {ReleasesService} from "../services/releases.service";
import {AsbPopoverComponent} from "../modules/shared/popover-template/popover.component";
import {AsbConfirmDialogComponent} from "../modules/shared/popover-template/confirm-dialog/confirm-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    AsbPopoverComponent,
    AsbConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(asbAppReducer),
    EffectsModule.forRoot(asbAppEffects),
    ToastrModule.forRoot(),
    AppRoutingModule,
    AsbAppIconsModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [
    ProcessingService,
    UploadService,
    ScriptService,
    ReleasesService,
    DataService,
    UrlService,
    SearchService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
