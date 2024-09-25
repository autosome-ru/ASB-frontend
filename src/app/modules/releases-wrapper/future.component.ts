import {ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewEncapsulation} from "@angular/core";
import * as fromSelectors from "src/app/store/selector/adastra";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {ReleaseModel} from "../../models/releases.model";
import {AppState} from "../../store/reducer/adastra";


@Component({
    selector: "asb-future",
    template: `
    <ngb-alert style="margin-top: -1rem" type="danger" [dismissible]="false">
        <strong>Attention!</strong>
        You are using pre-release <strong>{{(release$ | async)?.name}}</strong>. The underlying data can change. You can switch to the latest stable ADASTRA version:
        <a href="https://adastra.autosome.org">adastra.autosome.org</a>
    </ngb-alert>
    <router-outlet></router-outlet>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class FutureComponent implements OnInit {
    @HostBinding("class.asb-future")
    private readonly cssClass = true;
    public release$: Observable<ReleaseModel>;

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.release$ = this.store.select(fromSelectors.selectCurrentRelease);
    }

}
