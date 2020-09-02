import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from "@angular/core";
import {SeoModel} from "src/app/models/seo.model";
import {ActivatedRoute} from "@angular/router";
import {SeoService} from "src/app/services/seo.servise";


@Component({
    selector: "asb-about",
    templateUrl: "./about-page.component.html",
    styleUrls: ["./about-page.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class AboutPageComponent implements OnInit {

    constructor(private route: ActivatedRoute,
                private seoService: SeoService) {}

    ngOnInit() {
        this.seoService.updateSeoInfo(this.route.snapshot.data as SeoModel);
    }

}
