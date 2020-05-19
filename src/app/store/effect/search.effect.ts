import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../reducer";
import {SearchService} from "src/app/services/search.service";
import * as fromActions from "src/app/store/action/search.action";
import * as fromSelectors from "src/app/store/selector";
import {catchError, map, mergeMap, take} from "rxjs/operators";
import { EMPTY, of} from "rxjs";

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
            this.searchService.getSearchResult(
                action.payload.search,
                action.payload.params).pipe(
                map(results => new fromActions.LoadSearchResultsSuccessAction(results)),
                catchError(() => of(new fromActions.LoadSearchResultsFailAction())),
            )
        )
    );

    @Effect()
    loadSearchResultsWithPagination$ = this.actions$.pipe(
        ofType(fromActions.ActionTypes.LoadSearchResultsWithPagination),
        mergeMap((action: fromActions.LoadSearchResultsWithPaginationAction) =>
            this.store.select(fromSelectors.selectCurrentSearchQuery).pipe(
                take(1),
                mergeMap((query) => this.searchService.getSearchResult(query, action.payload.params).pipe(
                            map(results => new fromActions.LoadSearchResultsSuccessAction(results)),
                            catchError(() => of(new fromActions.LoadSearchResultsFailAction()))
                        )
                    )
             )
        )
    );

    @Effect()
    loadSearchResultsFail$ = this.actions$.pipe(
        ofType(fromActions.ActionTypes.LoadSearchResultsFail),
        mergeMap(() => {
            console.log("Something went wrong");
            return EMPTY;
        }),
    );

}
