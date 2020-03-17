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
            this.searchService.getSearchOptions(action.payload).pipe(
                map(options => new fromActions.LoadSearchOptionsSuccessAction(options)),
                catchError(() => of(new fromActions.LoadSearchOptionsSuccessAction([]))),
            )
        )
    );

    @Effect()
    loadSearchResults$ = this.actions$.pipe(
        ofType(fromActions.ActionTypes.LoadSearchResults),
        mergeMap((action: fromActions.LoadSearchResultsAction) =>
            this.searchService.getSearchResult(action.payload).pipe(
                map(results => new fromActions.LoadSearchResultsSuccessAction(results)),
                catchError((s) => {
                        return of(new fromActions.LoadSearchResultsFailAction({
                            search: action.payload,
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
            action.payload.errorCode === 507 ?
                this.tostr.warning("Try a shorter search interval",
                    "Result too long") :
            console.log("Something went wrong with " + action.payload.search.searchInput);
            return EMPTY;
        }),
    );

}
