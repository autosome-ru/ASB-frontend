import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeprecatedComponent} from "./deprecated.component";
import {RecentComponent} from "./recent.component";
import {RedirectReleaseComponent} from "./redirect-release.component";
import {RouterModule} from "@angular/router";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";
import {RemovedComponent} from "./removed.component";
import {MatIconModule} from "@angular/material/icon";
import {FutureComponent} from "./future.component";


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbAlertModule,
        MatIconModule,
    ],
    declarations: [
        DeprecatedComponent,
        RecentComponent,
        RemovedComponent,
        FutureComponent,
        RedirectReleaseComponent]
})
export class ReleasesWrapperModule { }
