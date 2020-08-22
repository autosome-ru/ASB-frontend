import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {releasesList} from "./helpers/releases";
import {Location} from "@angular/common";

@Component({
    selector: "redirect",
    template: "",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RedirectComponent implements OnInit {
    constructor(private router: Router, private location: Location) { }
    ngOnInit() {
        let path = this.location.path()
        if (!path.startsWith('/')) {
            path = '/' + path
        }
        this.router.navigateByUrl(`/${releasesList[0].url}${path}`)
    }
}
