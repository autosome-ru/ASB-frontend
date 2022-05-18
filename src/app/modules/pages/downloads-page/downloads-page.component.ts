import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {SeoService} from "../../../services/seo.servise";
import {SeoModel} from "../../../models/seo.model";
import {ReleaseModel} from "../../../models/releases.model";
import {releasesList} from "../../../helpers/constants/releases";


@Component({
    selector: "asb-downloads-page",
    templateUrl: "./downloads-page.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DownloadsPageComponent implements OnInit {
    public releasesList: ReleaseModel[];

    constructor(private route: ActivatedRoute,
                private seoService: SeoService) { }

    ngOnInit(): void {
        this.seoService.updateSeoInfo(this.route.snapshot.data as SeoModel);
        this.releasesList = releasesList;
    }

    _getBadmapsName(release: ReleaseModel) {
        return `BADmaps_${release.name.replace(' ', '_')}.zip`;
    }

    _getGtrdExpsName(release: ReleaseModel) {
        return `ADASTRA_${release.name.replace(' ', '_')}_GTRD_exps.tsv`;
    }
}
