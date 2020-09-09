import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    Inject,
    OnInit,
    PLATFORM_ID,
    ViewEncapsulation
} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {SeoModel} from "../../../models/seo.model";
import {SeoService} from "../../../services/seo.servise";
import {isPlatformBrowser} from "@angular/common";

@Component({
    selector: "asb-help-page",
    templateUrl: "./help-page.component.html",
    styleUrls: ["./help-page.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class HelpPageComponent implements OnInit, AfterViewInit {
    private readonly isBrowser: boolean;

    constructor(private route: ActivatedRoute,
                private seoService: SeoService,
                @Inject(PLATFORM_ID) private platformId
) { this.isBrowser = isPlatformBrowser(platformId);}



    ngOnInit(): void {
        this.seoService.updateSeoInfo(this.route.snapshot.data as SeoModel);
    }
    ngAfterViewInit() {
        if (this.isBrowser) {
            const initialElement: HTMLElement = document.getElementById(this.route.snapshot.fragment)
            if (initialElement) {
                initialElement.scrollIntoView({behavior: 'smooth'})
            }
        }
    }

    getId(value: string) {
        return value.replace(' ', '-')
    }
}
