import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import {concat, interval, Subscription} from 'rxjs';
import { first } from 'rxjs/operators';
import {updateCheckInterval} from "../helpers/constants/constants";

@Injectable()
export class CheckForUpdateService {
    private subscriptions: Subscription = new Subscription();

    constructor(private appRef: ApplicationRef, private updates: SwUpdate) {
        // Allow the app to stabilize first, before starting polling for updates with `interval()`.

    }
    startSubscription() {
        const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
        const everyDay$ = interval(updateCheckInterval);
        const everyDayOnceAppIsStable$ = concat(appIsStable$, everyDay$);

        this.subscriptions.add(
            everyDayOnceAppIsStable$.subscribe(
            () => this.updates.checkForUpdate().then(
                () => null, () => console.log('sw is not supported')
            ))
        )
    }

    cancelSubscription() {
        this.subscriptions.unsubscribe()
    }
}
