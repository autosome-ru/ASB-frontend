import {Actions, Effect, ofType} from "@ngrx/effects";
import * as fromActions from "src/app/store/action/data.action";
import {catchError, map, mergeMap, switchMap, take} from "rxjs/operators";
import {combineLatest, EMPTY, of} from "rxjs";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppState} from "src/app/store";
import {DataService} from "src/app/services/data.service";
import * as fromSelectors from "src/app/store/selector";
import {Router} from "@angular/router";

@Injectable()
export class DataEffect {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private dataService: DataService,
        private router: Router,
    ) { }

    @Effect()
    loadTotalStats$ = this.actions$.pipe(
        ofType(fromActions.ActionTypes.LoadTotalInfo),
        mergeMap(() =>
            this.dataService.getTotalInfo().pipe(
                map(info => new fromActions.LoadTotalInfoSuccessAction(info)),
                catchError(() => of(new fromActions.LoadTotalInfoFailAction())),
            )
        )
    );

    @Effect()
    initTotalStats$ = this.actions$.pipe(
        ofType(fromActions.ActionTypes.InitTotalInfo),
        mergeMap(() =>
            combineLatest([
                this.store.select(fromSelectors.selectTotalInfo),
                this.store.select(fromSelectors.selectTotalInfoLoading),
            ]).pipe(
                take(1),
                switchMap(([info, loading]) =>
                    !loading && !info
                        ? of(new fromActions.LoadTotalInfoAction())
                        : EMPTY
                ),
            ),
        ),
    );

    @Effect()
    loadTfStats$ = this.actions$.pipe(
        ofType(fromActions.ActionTypes.LoadTfInfo),
        mergeMap((action: fromActions.LoadTfInfoAction) =>
            this.dataService.getTfInfo(action.payload).pipe(
                map(info => new fromActions.LoadTfInfoSuccessAction(info)),
                catchError(() => of(new fromActions.LoadTfInfoFailAction())),
            )
        )
    );


    @Effect()
    loadClStats$ = this.actions$.pipe(
        ofType(fromActions.ActionTypes.LoadClInfo),
        mergeMap((action: fromActions.LoadClInfoAction) =>
            this.dataService.getClInfo(action.payload).pipe(
                map(info => new fromActions.LoadClInfoSuccessAction(info)),
                catchError(() => of(new fromActions.LoadClInfoFailAction())),
            )
        )
    );

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

    @Effect()
    initSnpStats$ = this.actions$.pipe(
        ofType(fromActions.ActionTypes.InitSnpInfo),
        mergeMap((action: fromActions.InitSnpInfoAction) =>
            combineLatest([
                this.store.select(fromSelectors.selectSnpInfoDataById, action.payload.rsId + action.payload.alt),
                this.store.select(fromSelectors.selectSnpInfoDataLoadingById, action.payload.rsId + action.payload.alt),
            ]).pipe(
                take(1),
                switchMap(([snp, loading]) =>
                    !loading && snp === undefined
                        ? of(new fromActions.LoadSnpInfoAction(action.payload))
                        : EMPTY
                ),
            ),
        ),
    );
}
