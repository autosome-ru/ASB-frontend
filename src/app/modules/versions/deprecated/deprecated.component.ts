import {ChangeDetectionStrategy, Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import * as fromSelectors from "src/app/store/selector";
import {AppState} from "../../../store/reducer";
import {Store} from "@ngrx/store";
import {ReleaseModel} from "../../../models/releases.model";
import {Observable} from "rxjs";
import {isPlatformBrowser} from "@angular/common";


@Component({
    selector: 'asb-deprecated',
    templateUrl: './deprecated.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeprecatedComponent implements OnInit {
    public release$: Observable<ReleaseModel>;
    public isBrowser: boolean;

    constructor(private store: Store<AppState>,
                @Inject(PLATFORM_ID) private platformId) {
    this.isBrowser = isPlatformBrowser(platformId);
}

    ngOnInit(): void {
        this.release$ = this.store.select(fromSelectors.selectCurrentRelease)
    }

}
