import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
    selector: "asb-recent",
    templateUrl: './recent.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class RecentComponent implements OnInit {
    public queryParams: Params;

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.queryParams = this.route.snapshot.queryParams
    }

    dismiss() {
        this.router.navigate([], {
            queryParams: {...this.queryParams, releaseName: null},
            queryParamsHandling: 'merge'
        })
    }
}
