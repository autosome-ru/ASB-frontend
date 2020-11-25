import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnpAnnotationMainRoutingModule } from './snp-annotation-main-routing.module';
import {SnpAnnotationMainComponent} from './snp-annotation-main.component';
import {UploadFileComponent} from './upload-file/upload-file.component';
import {DragDropDirective} from '../../../directives/drag-n-drop.directive';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [SnpAnnotationMainComponent, UploadFileComponent, DragDropDirective],
  imports: [
    CommonModule,
    SnpAnnotationMainRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressBarModule,
    MatIconModule
  ]
})
export class SnpAnnotationMainModule { }
