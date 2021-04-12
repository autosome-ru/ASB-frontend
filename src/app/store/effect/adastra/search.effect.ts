import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../../reducer/adastra";
import {SearchService} from "src/app/services/search.service";
import * as fromActions from "src/app/store/action/adastra/search.action";
import * as fromSelectors from "src/app/store/selector/adastra";
import {catchError, map, mergeMap, take, tap} from "rxjs/operators";
import { EMPTY, of} from "rxjs";

@Injectable()
export class SearchEffect {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private searchService: SearchService,
    ) {
    }

    loadSearchOptions$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.ActionTypes.LoadSearchOptions),
        mergeMap((action: fromActions.LoadSearchOptionsAction) =>
            this.searchService.getSearchOptions(action.payload.search, action.payload.tfOrCl).pipe(
                map(options => new fromActions.LoadSearchOptionsSuccessAction(
                    {options, tfOrCl: action.payload.tfOrCl})),
                catchError(() => of(new fromActions.LoadSearchOptionsFailAction(action.payload))),
            )
        )
    ));

    loadSearchOptionsFail$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.ActionTypes.LoadSearchOptionsFail),
        tap((action: fromActions.LoadSearchOptionsFailAction) => {
            console.log("Something went wrong with get search options", action.payload);
            }
        )),
        {dispatch: false}
    );

    loadSearchOptionsByGeneName$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.ActionTypes.LoadSearchByGeneNameOptions),
        mergeMap((action: fromActions.LoadSearchByGeneNameOptionsAction) =>
            this.searchService.getSearchOptionsByGeneName(action.payload.name, action.payload.isEqtl).pipe(
                map(options => new fromActions.LoadSearchByGeneNameOptionsSuccessAction(
                    options)),
                catchError(() => of(new fromActions.LoadSearchByGeneNameOptionsFailAction(action.payload))),
            )
        )
    ));

    loadSearchOptionsByGeneNameFail$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.ActionTypes.LoadSearchByGeneNameOptionsFail),
        tap((action: fromActions.LoadSearchOptionsFailAction) => {
                console.log("Something went wrong with get search options", action.payload);
                return EMPTY;
            }
        )), {dispatch: false}
    );

    loadSearchResults$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.ActionTypes.LoadSearchResults),
        mergeMap((action: fromActions.LoadSearchResultsAction) =>
            this.searchService.getSearchResult(
                action.payload.search,
                action.payload.params).pipe(
                map(results => new fromActions.LoadSearchResultsSuccessAction(
                    {results, fdr: action.payload.search.fdr, es: action.payload.search.es})),
                catchError(() => of(new fromActions.LoadSearchResultsFailAction())),
            )
        ))
    );


    loadSearchResultsWithPagination$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.ActionTypes.LoadSearchResultsWithPagination),
        mergeMap((action: fromActions.LoadSearchResultsWithPaginationAction) =>
            this.store.select(fromSelectors.selectCurrentSearchQuery).pipe(
                take(1),
                mergeMap((query) => this.searchService.getSearchResult(query, action.payload.params).pipe(
                            map(results => new fromActions.LoadSearchResultsSuccessAction(
                                {results, fdr: query.fdr, es: query.es})),
                            catchError(() => of(new fromActions.LoadSearchResultsFailAction()))
                        )
                    )
             )
        )
    ));

    loadSearchResultsFail$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.ActionTypes.LoadSearchResultsFail),
        tap(() => {
            console.log("Something went wrong");
        }),
    ), {dispatch: false}
    );

}
