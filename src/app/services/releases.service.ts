import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {ReleaseModel} from "../models/releases.model";
import { Location } from "@angular/common";
import {Observable, of} from "rxjs";
import {releasesList} from "../helpers/releases";


@Injectable()
export class ReleasesService {

    constructor(private router: Router, private location: Location) {
    }
    private releases: ReleaseModel[] = releasesList

    getRelease(releaseUrl: string): ReleaseModel {
        if (releaseUrl == "") {
            return this.releases[0]
        }
        const releaseIndex = this.releases.findIndex(release => release.url === releaseUrl)
        if (releaseIndex == -1) {
            this.router.navigateByUrl(`/${this.releases[0].url}/404`)
        } else {
            return this.releases[releaseIndex]
        }
    }


    getReleaseFromRoute(): Observable<ReleaseModel> {
        let path: string = ""
        const url: string = this.location ? this.location.path() : ''
        if ( url != "" && url != "/") {
            path = url.split('/')[1]
        }
        return of(this.getRelease(path))
    }



}
