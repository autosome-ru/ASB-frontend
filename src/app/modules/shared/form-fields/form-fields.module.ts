import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormFieldsRoutingModule } from './form-fields-routing.module';
import {AsbChrPosInputComponent} from './form-fields.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";


@NgModule({
    declarations: [AsbChrPosInputComponent],
    exports: [AsbChrPosInputComponent],
    imports: [
        CommonModule,
        FormFieldsRoutingModule,
        ReactiveFormsModule,
        MatInputModule
    ]
})
export class FormFieldsModule { }
