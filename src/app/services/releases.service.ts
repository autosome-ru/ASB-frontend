import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {ReleaseModel} from "../models/releases.model";
import { Location } from "@angular/common";
import {Observable, of} from "rxjs";
import {recentRelease, releasesList} from "../helpers/releases";


@Injectable()
export class ReleasesService {

    constructor(private router: Router, private location: Location) {
    }
    private releases: ReleaseModel[] = releasesList

    getReleaseFromPrefix(releaseUrl: string): ReleaseModel {

        const releaseIndex = this.releases.findIndex(release => release.url === releaseUrl)
        if (releaseIndex != -1) {
            return this.releases[releaseIndex]
        }
        return recentRelease
    }


    getReleaseFromRoute(): Observable<ReleaseModel> {
        let path: string = ""
        let url: string = this.location ? this.location.path() : ''
        if ( url != "" && url != "/") {
            path = url.split('/')[1]
        }
        return of(this.getReleaseFromPrefix(path))
    }



}
