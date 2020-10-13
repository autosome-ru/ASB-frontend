import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeprecatedComponent} from "./deprecated.component";
import {RecentComponent} from "./recent.component";
import {RedirectReleaseComponent} from "./redirect-release.component";
import {RouterModule} from "@angular/router";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbAlertModule,
    ],
    declarations: [DeprecatedComponent, RecentComponent, RedirectReleaseComponent]
})
export class ReleasesWrapperModule { }
