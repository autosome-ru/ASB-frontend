import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../reducer";
import {SearchService} from "src/app/services/search.service";
import * as fromActions from "src/app/store/action/search.action";
import {catchError, map, mergeMap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable()
export class SearchEffect {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private searchService: SearchService,
    ) {
    }
    @Effect()
    loadSearchOptions$ = this.actions$.pipe(
        ofType(fromActions.ActionTypes.LoadSearchOptions),
        mergeMap((action: fromActions.LoadSearchOptionsAction) =>
            this.searchService.getSearchOptions(action.payload).pipe(
                map(options => new fromActions.LoadSearchOptionsSuccessAction(options)),
                catchError(() => of(new fromActions.LoadSearchOptionsSuccessAction([]))),
            )
        )
    );

}
