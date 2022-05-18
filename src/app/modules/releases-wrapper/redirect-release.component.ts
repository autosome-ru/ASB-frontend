import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Router} from "@angular/router";
import {recentRelease} from "../../helpers/constants/releases";
import {Location} from "@angular/common";

@Component({
    selector: "redirect",
    template: "",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class RedirectReleaseComponent implements OnInit {
    constructor(private router: Router, private location: Location) { }
    ngOnInit() {
        let path = this.location.path(true);
        if (!path.startsWith("/")) {
            path = "/" + path;
        }
        const t = this.router.parseUrl(`/${recentRelease.url}${path}`)
        this.router.navigateByUrl(t, {

        }).then(() => null);
    }
}
