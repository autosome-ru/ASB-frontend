import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {SeoModel} from "../../models/seo.model";
import {SeoService} from "../../services/seo.servise";

@Component({
    selector: "not-found-app",
    template: `<h4 style="margin-bottom: 0; padding-bottom: 0" >Page not found</h4>`,
    styles: [`.app-not-found`],
})
export class PageNotFoundComponent implements OnInit {
    constructor(private route: ActivatedRoute,
                private seoService: SeoService) {}
    ngOnInit() {
        this.seoService.updateSeoInfo(this.route.snapshot.data as SeoModel);
    }
}
