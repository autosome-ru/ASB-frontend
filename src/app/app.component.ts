import {
    Component,
    HostBinding, Inject,
    OnInit, PLATFORM_ID,
} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import {isPlatformBrowser} from "@angular/common";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.less"],
})
export class AppComponent  implements  OnInit {
    @HostBinding("class.asb-app")
    private cssClass = true;
    private readonly isBrowser: boolean;

    constructor(private router: Router,
                @Inject(PLATFORM_ID) private platformId) {
        this.isBrowser = isPlatformBrowser(platformId);
    }



    ngOnInit() {

        if (this.isBrowser) {
            this.router.events.subscribe((evt) => {
                if (!(evt instanceof NavigationEnd)) {
                    return;
                }
                window.scrollTo(0, 0);
            });
        }

    }
}
