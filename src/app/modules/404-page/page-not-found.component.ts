import {ChangeDetectionStrategy, Component, Inject, OnInit, Optional} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {SeoModel} from "../../models/seo.model";
import {SeoService} from "../../services/seo.servise";
import {RESPONSE} from "@nguniversal/express-engine/tokens";
import {Response} from "express";

@Component({
    selector: "not-found-app",
    templateUrl: "page-not-found.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent implements OnInit {
    private readonly response: Response;
    constructor(private route: ActivatedRoute,
                private seoService: SeoService,
                @Optional() @Inject(RESPONSE) response: any) {
        this.response = response;
    }
    ngOnInit() {
        this.seoService.updateSeoInfo(this.route.snapshot.data as SeoModel);
        if (this.response) {
            this.response.statusCode = 404;
            this.response.status(404);
        }
    }
}
