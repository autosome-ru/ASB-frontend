import {Actions, Effect, ofType} from "@ngrx/effects";
import * as fromActions from "src/app/store/action/data.action";
import {catchError, map, mergeMap} from "rxjs/operators";
import {EMPTY, of} from "rxjs";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppState} from "src/app/store";
import {DataService} from "src/app/services/data.service";
import {Router} from "@angular/router";

@Injectable()
export class DataEffect {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private dataService: DataService,
        private router: Router,
    ) {
    }

    @Effect()
    loadSnpStats$ = this.actions$.pipe(
        ofType(fromActions.ActionTypes.LoadSnpInfo),
        mergeMap((action: fromActions.LoadSnpInfoAction) =>
            this.dataService.getSnpInfoById(action.payload).pipe(
                map(info => new fromActions.LoadSnpInfoSuccessAction(info)),
                catchError(() => of(new fromActions.LoadSnpInfoFailAction(action.payload))),
            )
        )
    );
    @Effect()
    loadSnpStatsFail$ = this.actions$.pipe(
        ofType(fromActions.ActionTypes.LoadSnpInfoFail),
        mergeMap(() => {
            this.router.navigate(["/page-not-found"]);
            return EMPTY;
        }),
    );
}
