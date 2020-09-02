import {ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';
import * as fromSelectors from "src/app/store/selector";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {ReleaseModel} from "../models/releases.model";
import {AppState} from "../store/reducer";


@Component({
    selector: 'asb-deprecated',
    template: `
    <ngb-alert style="margin-top: -1rem" type="danger" [dismissible]="false">
        <strong>Attention!</strong>
        ADASTRA release <strong>{{(release$ | async)?.name}}</strong> is outdated. Please switch to the latest ADASTRA release
        <a href="https://adastra.autosome.ru">adastra.autosome.ru</a>
    </ngb-alert>
    <router-outlet></router-outlet>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DeprecatedComponent implements OnInit {
    @HostBinding("class.asb-deprecated")
    private readonly cssClass = true;
    public release$: Observable<ReleaseModel>;

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.release$ = this.store.select(fromSelectors.selectCurrentRelease)
    }

}
