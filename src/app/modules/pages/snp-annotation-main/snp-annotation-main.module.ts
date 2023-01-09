import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnpAnnotationMainRoutingModule } from './snp-annotation-main-routing.module';
import {SnpAnnotationMainComponent} from './snp-annotation-main.component';
import {UploadFileComponent} from './upload-file/upload-file.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {AsbTourModule} from "../../shared/tour-template/tour-module";
import {MatTooltipModule} from "@angular/material/tooltip";
import {JoyrideModule} from "ngx-joyride";
import {MatSelectModule} from "@angular/material/select";
import {ArticleCiteModule} from "../../shared/article-cite/article-cite.module";
import {NewsSectionModuleModule} from "../../shared/news-section/news-section.module";
import {AsbDirectivesModule} from "../../../directives/directives.module";


@NgModule({
    declarations: [SnpAnnotationMainComponent, UploadFileComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatProgressBarModule,
        MatIconModule,
        AsbTourModule,
        FormsModule,
        MatTooltipModule,
        JoyrideModule,
        MatSelectModule,
        ArticleCiteModule,
        NewsSectionModuleModule,
        AsbDirectivesModule,
        SnpAnnotationMainRoutingModule,
    ]
})
export class SnpAnnotationMainModule { }
