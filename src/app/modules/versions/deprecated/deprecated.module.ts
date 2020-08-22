import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeprecatedComponent} from "./deprecated.component";
import {DeprecatedRoutingModule} from "./deprecated-routing.module";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
    imports: [
        CommonModule,
        DeprecatedRoutingModule,
        NgbAlertModule,
    ],
    declarations: [DeprecatedComponent]
})
export class DeprecatedModule { }
