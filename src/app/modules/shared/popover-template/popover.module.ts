import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomTemplateDialogComponent} from "./custom-template-dialog/custom-template-dialog.component";
import {AsbConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
  ],
  declarations: [
    CustomTemplateDialogComponent,
    AsbConfirmDialogComponent
  ],
  entryComponents: [
    CustomTemplateDialogComponent,
    AsbConfirmDialogComponent
  ],
  exports: [
    CustomTemplateDialogComponent,
    AsbConfirmDialogComponent
  ]
})
export class PopoversModule {
}
