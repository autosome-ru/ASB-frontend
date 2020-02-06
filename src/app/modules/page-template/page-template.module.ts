import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AsbFooterComponent} from "./footer/footer.component";
import {AsbHeaderComponent} from "./header/header.component";
import { PageTemplateComponent } from './page-template.component';
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        RouterModule,
    ],
    declarations: [AsbFooterComponent, AsbHeaderComponent, PageTemplateComponent],
    exports: [
        PageTemplateComponent,
    ]
})
export class AsbSharedPageModule {
}
