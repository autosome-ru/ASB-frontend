import {Component, HostBinding, HostListener, Inject, OnInit, PLATFORM_ID} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {isPlatformBrowser} from "@angular/common";

@Component({
    selector: "home-page",
    templateUrl: "./home-page.component.html",
    styleUrls: [ "./home-page.component.less" ]
})
export class HomePageComponent implements OnInit {
    @HostBinding("class.asb-home")
    private readonly cssClass = true;
    isBrowser: boolean;
    constructor(private route: ActivatedRoute,
                private titleService: Title,
                @Inject(PLATFORM_ID) private platformId: Object) {
                        this.isBrowser = isPlatformBrowser(this.platformId);
    }
    opacity: number = 1;

    @HostListener("window:scroll", [])
    onScroll() {
        if (this.isBrowser) {
            const pos = (document.documentElement.scrollTop || document.body.scrollTop);
            if (pos) {
                this.opacity = 1 - 3 * pos / document.documentElement.offsetWidth;
            } else {
                this.opacity = 1;
            }
        }

    }
    ngOnInit() {
        this.titleService.setTitle(this.route.snapshot.data.title);
    }
}
