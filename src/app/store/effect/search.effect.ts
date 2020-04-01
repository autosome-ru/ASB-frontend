import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../reducer";
import {SearchService} from "src/app/services/search.service";
import * as fromActions from "src/app/store/action/search.action";
import {catchError, map, mergeMap} from "rxjs/operators";
import {EMPTY, of} from "rxjs";

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
            this.searchService.getSearchOptions(action.payload.search, action.payload.tfOrCl).pipe(
                map(options => new fromActions.LoadSearchOptionsSuccessAction(
                    {options, tfOrCl: action.payload.tfOrCl})),
                catchError(() => of(new fromActions.LoadSearchOptionsFailAction(action.payload))),
            )
        )
    );

    @Effect()
    loadSearchOptionsFail$ = this.actions$.pipe(
        ofType(fromActions.ActionTypes.LoadSearchOptionsFail),
        mergeMap((action: fromActions.LoadSearchOptionsFailAction) => {
            console.log("Something went wrong with get search options", action.payload);
            return EMPTY;
            }
        )
    );

    @Effect()
    loadSearchResults$ = this.actions$.pipe(
        ofType(fromActions.ActionTypes.LoadSearchResults),
        mergeMap((action: fromActions.LoadSearchResultsAction) =>
            this.searchService.getSearchResult(action.payload.search, action.payload.isAdvanced).pipe(
                map(results => new fromActions.LoadSearchResultsSuccessAction(results)),
                catchError(() => {
                        return of(new fromActions.LoadSearchResultsFailAction({
                            ...action.payload,
                        }));
                    }),
            )
        )
    );

    @Effect()
    loadSearchResultsFail$ = this.actions$.pipe(
        ofType(fromActions.ActionTypes.LoadSearchResultsFail),
        mergeMap((action: fromActions.LoadSearchResultsFailAction) => {
            console.log("Something went wrong with " + action.payload.search.searchInput);
            return EMPTY;
        }),
    );

}
