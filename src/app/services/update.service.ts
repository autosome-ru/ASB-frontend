import { ApplicationRef, Injectable } from '@angular/core';

@Injectable()
export class CheckForUpdateService {

    constructor(private appRef: ApplicationRef) {
        // Allow the app to stabilize first, before starting polling for updates with `interval()`.

    }
}
