import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../reducer";
import {SearchService} from "src/app/services/search.service";
import * as fromActions from "src/app/store/action/search.action";
import {catchError, map, mergeMap} from "rxjs/operators";
import {EMPTY, of} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class SearchEffect {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private searchService: SearchService,
        private tostr: ToastrService,
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
                catchError((s) => {
                        return of(new fromActions.LoadSearchResultsFailAction({
                            ...action.payload,
                            errorCode: s.status,
                        }));
                    }
                    ),
            )
        )
    );

    @Effect()
    loadSearchResultsFail$ = this.actions$.pipe(
        ofType(fromActions.ActionTypes.LoadSearchResultsFail),
        mergeMap((action: fromActions.LoadSearchResultsFailAction) => {
            if (!action.payload.isAdvanced) {
                action.payload.errorCode === 507 ?
                    this.tostr.warning(
                        "Try a shorter search interval or use advanced search",
                        "Result too long") :
                    console.log("Something went wrong with " + action.payload.search.searchInput);
            } else {
                if (action.payload.search.searchByArray.some(s => s === "pos")) {
                    this.tostr.warning(
                        "Try a shorter search interval or use get in csv option",
                        "Result too long");
                } else {
                    this.tostr.warning(
                        "Try search by genome position or use get in csv option",
                        "Result too long");
                }
            }
            return EMPTY;
        }),
    );

}
