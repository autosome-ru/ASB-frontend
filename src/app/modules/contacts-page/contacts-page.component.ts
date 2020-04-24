import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {SeoService} from "../../services/seo.servise";
import {SeoModel} from "../../models/seo.model";

@Component({
    selector: "asb-about-us",
    templateUrl: "./contacts-page.component.html",
    styleUrls: ["./contacts-page.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsPageComponent implements OnInit {

    constructor(private route: ActivatedRoute,
                private seoService: SeoService) {}
    ngOnInit() {
        this.seoService.updateSeoInfo(this.route.snapshot.data as SeoModel);
    }

}
