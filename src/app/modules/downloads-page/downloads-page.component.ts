import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {SeoService} from "../../services/seo.servise";
import {SeoModel} from "../../models/seo.model";
import {releaseName} from "../../helpers/constants";


@Component({
    selector: "asb-downloads-page",
    templateUrl: "./downloads-page.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadsPageComponent implements OnInit {
    public releaseName: string;

    constructor(private route: ActivatedRoute,
                private seoService: SeoService) { }

    ngOnInit(): void {
        this.seoService.updateSeoInfo(this.route.snapshot.data as SeoModel);
        this.releaseName = releaseName

    }

}
