import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {AsbChrPosInputComponent} from "./form-fields.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";


@NgModule({
    declarations: [AsbChrPosInputComponent],
    exports: [AsbChrPosInputComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule
    ]
})
export class FormFieldsModule { }
