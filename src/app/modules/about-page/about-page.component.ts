import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {SeoModel} from "../../models/seo.model";
import {ActivatedRoute} from "@angular/router";
import {SeoService} from "../../services/seo.servise";


@Component({
    selector: "asb-about",
    templateUrl: "./about-page.component.html",
    styleUrls: ["./about-page.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent implements OnInit {

    constructor(private route: ActivatedRoute,
                private seoService: SeoService) {}

    ngOnInit() {
        this.seoService.updateSeoInfo(this.route.snapshot.data as SeoModel);
    }

}
