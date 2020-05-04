import {
    ChangeDetectionStrategy,
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
    changeDetection: ChangeDetectionStrategy.OnPush,
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
    }
}
