import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCiteComponent } from './article-cite.component';



@NgModule({
    declarations: [ArticleCiteComponent],
    imports: [
        CommonModule
    ],
    exports: [
        ArticleCiteComponent
    ]
})
export class ArticleCiteModule { }
