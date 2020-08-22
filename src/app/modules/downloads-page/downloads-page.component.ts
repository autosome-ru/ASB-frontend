import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {SeoService} from "../../services/seo.servise";
import {SeoModel} from "../../models/seo.model";
import {Observable} from "rxjs";
import {ReleaseModel} from "../../models/releases.model";
import {AppState} from "../../store/reducer";
import {Store} from "@ngrx/store";
import * as fromSelectors from "src/app/store/selector";


@Component({
    selector: "asb-downloads-page",
    templateUrl: "./downloads-page.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadsPageComponent implements OnInit {

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>,
                private seoService: SeoService) { }

    public release$: Observable<ReleaseModel>
    ngOnInit(): void {
        this.seoService.updateSeoInfo(this.route.snapshot.data as SeoModel)
        this.release$ = this.store.select(fromSelectors.selectCurrentRelease)
    }

}
