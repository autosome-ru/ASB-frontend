import {ChangeDetectionStrategy, Component, Inject, OnInit, Optional, ViewEncapsulation} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {SeoModel} from "src/app/models/seo.model";
import {SeoService} from "src/app/services/seo.servise";
import {RESPONSE} from "@nguniversal/express-engine/tokens";
import {Response} from "express";
import {ProcessingService} from "../../../services/processing.service";
import * as fromActions from 'src/app/store/action/ananastra';
import {AnnotationStoreState} from "../../../store/reducer/ananastra";
import {Store} from "@ngrx/store";

@Component({
    selector: "not-found-app",
    templateUrl: "page-not-found.component.html",
    styleUrls: ["./page-not-found.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class PageNotFoundComponent implements OnInit {
    private readonly response: Response;
    public ticketId: string;
    constructor(private route: ActivatedRoute,
                private seoService: SeoService,
                private router: Router,
                @Optional() private store: Store<AnnotationStoreState>,
                @Optional() private processingService: ProcessingService,
                @Optional() @Inject(RESPONSE) response: any) {
        this.response = response;
    }
    ngOnInit() {
        this.seoService.updateSeoInfo(this.route.snapshot.data as SeoModel);
        if (this.response) {
            this.response.statusCode = 404;
            this.response.status(404);
        }
        this.ticketId = this.route.snapshot.queryParams.ticket
        if (this.ticketId) {
                this.checkTicket()
        }

    }

    private checkTicket() {
        this.store.dispatch(new fromActions.annotation.InitPingAnnotationAction(this.ticketId))
    }
}
