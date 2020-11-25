import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../../reducer/adastra";
import * as fromActions from "src/app/store/action/adastra/releases.action";
import {catchError, map, mergeMap} from "rxjs/operators";
import { EMPTY, of} from "rxjs";
import {ReleasesService} from "../../../services/releases.service";

@Injectable()
export class ReleaseEffect {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private releasesService: ReleasesService,
    ) {
    }

    @Effect()
    getCurrentRelease$ = this.actions$.pipe(
        ofType(fromActions.ActionTypes.GetCurrentRelease),
        mergeMap(() =>
            this.releasesService.getReleaseFromRoute().pipe(
                map(release => new fromActions.GetCurrentReleaseActionSuccess(release)),
                catchError(() => of(new fromActions.GetCurrentReleaseActionFail())),
            )
        )
    );


    @Effect()
    getCurrentReleaseFail$ = this.actions$.pipe(
        ofType(fromActions.ActionTypes.GetCurrentReleaseFail),
        mergeMap(() => {
            console.log("Something went wrong");
            return EMPTY;
        }),
    );

}
