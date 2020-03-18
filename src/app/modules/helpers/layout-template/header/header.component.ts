import {ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit} from "@angular/core";
import {MediaMatcher} from "@angular/cdk/layout";

@Component({
  selector: "asb-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.less"]
})
export class AsbHeaderComponent implements OnInit, OnDestroy {
    @HostBinding("class.asb-header")
    private readonly cssClass = true;
    // private readonly _mobileQueryListener: () => void;
    // mobileQuery: MediaQueryList;
    sidenavOpened: boolean = false;

    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
        // this.mobileQuery = media.matchMedia("(max-width: 567px)");
        // this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        // this.mobileQuery.addEventListener("change", this._mobileQueryListener);
    }

    ngOnInit() {
  }
    ngOnDestroy(): void {
        // this.mobileQuery.removeEventListener("change", this._mobileQueryListener);
    }


    _changeSidenav(type: "toggle" | "close") {
        type === "toggle" ? this.sidenavOpened = !this.sidenavOpened : this.sidenavOpened = false;
    }
}
