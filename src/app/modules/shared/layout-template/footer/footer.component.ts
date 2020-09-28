import {ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewEncapsulation} from "@angular/core";
import {ReleaseModel} from "../../../../models/releases.model";
import * as fromSelectors from "src/app/store/selector";
import {Observable} from "rxjs";
import {AppState} from "../../../../store/reducer";
import {Store} from "@ngrx/store";


@Component({
    selector: "asb-footer",
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class AsbFooterComponent implements OnInit {
    @HostBinding("class.asb-footer")
    private readonly cssClass = true;
    public release$: Observable<ReleaseModel>;
    constructor(private store: Store<AppState>) { }

    ngOnInit() {
        this.release$ = this.store.select(fromSelectors.selectCurrentRelease);
    }

}
