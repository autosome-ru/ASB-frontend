import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {SeoModel} from "../../models/seo.model";
import {SeoService} from "../../services/seo.servise";

@Component({
    selector: "asb-help-page",
    templateUrl: "./help-page.component.html",
    styleUrls: ["./help-page.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpPageComponent implements OnInit {

    constructor(private route: ActivatedRoute,
                private seoService: SeoService) { }

    ngOnInit(): void {
        this.seoService.updateSeoInfo(this.route.snapshot.data as SeoModel);
    }

}
