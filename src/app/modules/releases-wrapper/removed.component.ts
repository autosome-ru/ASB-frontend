import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from "@angular/core";
import {ReleaseModel} from "../../models/releases.model";
import {Router} from "@angular/router";
import {ReleasesService} from "../../services/releases.service";


@Component({
    selector: "asb-removed",
    template: `<asb-deprecated></asb-deprecated>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class RemovedComponent implements OnInit {
    public release: ReleaseModel;

    constructor(private releaseService: ReleasesService,
                private router: Router) {}

    ngOnInit(): void {
        this.release = this.releaseService.getReleaseFromFullPath()
        this.router.navigate([`/downloads`],
            {queryParams: {
                    releaseName: this.release.name
                }})

    }

}
