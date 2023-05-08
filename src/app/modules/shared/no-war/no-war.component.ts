import {AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";
import {ReleaseModel} from "../../../models/releases.model";
import {recentRelease} from "../../../helpers/constants/releases";

@Component({
    selector: 'asb-no-war',
    templateUrl: './no-war.component.html',
    styleUrls: ['./no-war.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoWarComponent implements AfterViewInit {

    activeRoute$ = new BehaviorSubject<string>('');
    private subscriptions = new Subscription();
    public recentRelease: ReleaseModel = recentRelease;
    constructor(private router: Router) { }

    ngAfterViewInit(): void {
        this.subscriptions.add(
            this.router.events.subscribe(
                (event: any) => {
                    if (event instanceof NavigationEnd) {
                        this.activeRoute$.next(event.url)
                    }
                })
        );
    }

    checkRoute(routeUrl: string | null): boolean {
        switch (routeUrl) {
            case '/portal':
            case '/' + recentRelease.url + '/portal': {
                return false;
            }
            default:
                return false;
        }
    }
}
