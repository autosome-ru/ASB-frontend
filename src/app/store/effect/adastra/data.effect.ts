import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as fromActions from "src/app/store/action/adastra/data.action";
import {catchError, map, mergeMap, switchMap, take, tap} from "rxjs/operators";
import {combineLatest, EMPTY, of} from "rxjs";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppState} from "src/app/store/indexes";
import {DataService} from "src/app/services/data.service";
import * as fromSelectors from "src/app/store/selector/adastra";
import {Router} from "@angular/router";

@Injectable()
export class DataEffect {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private dataService: DataService,
        private router: Router,
    ) { }

    loadTotalStats$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.ActionTypes.LoadTotalInfo),
        mergeMap(() =>
            this.dataService.getTotalInfo().pipe(
                map(info => new fromActions.LoadTotalInfoSuccessAction(info)),
                catchError(() => of(new fromActions.LoadTotalInfoFailAction())),
            )
        )
    ));

    initTotalStats$ = createEffect(() => this.actions$.pipe(
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
    ));

    loadFaireStats$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.ActionTypes.LoadFaireInfo),
        mergeMap((action: fromActions.LoadFaireInfoAction) =>
            this.dataService.getFaireInfo(action.payload).pipe(
                map(info => new fromActions.LoadFaireInfoSuccessAction(info)),
                catchError(() => of(new fromActions.LoadFaireInfoFailAction())),
            )
        )
    ));
    loadAtacStats$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.ActionTypes.LoadAtacInfo),
        mergeMap((action: fromActions.LoadAtacInfoAction) =>
            this.dataService.getAtacInfo(action.payload).pipe(
                map(info => new fromActions.LoadAtacInfoSuccessAction(info)),
                catchError(() => of(new fromActions.LoadAtacInfoFailAction())),
            )
        )
    ));

    loadDnaseStats$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.ActionTypes.LoadDnaseInfo),
        mergeMap((action: fromActions.LoadDnaseInfoAction) =>
            this.dataService.getDnaseInfo(action.payload).pipe(
                map(info => new fromActions.LoadDnaseInfoSuccessAction(info)),
                catchError(() => of(new fromActions.LoadDnaseInfoFailAction())),
            )
        )
    ));

    loadSnpStats$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.ActionTypes.LoadSnpInfo),
        mergeMap((action: fromActions.LoadSnpInfoAction) =>
            this.dataService.getSnpInfoById(action.payload).pipe(
                map(info => new fromActions.LoadSnpInfoSuccessAction({info,
                    fdr: action.payload.fdr,
                    es: action.payload.es})
                ),
                catchError(() => of(new fromActions.LoadSnpInfoFailAction(action.payload))),
            )
        )
    ));

    loadSnpStatsFail$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.ActionTypes.LoadSnpInfoFail),
        tap(() => {
            this.router.navigate(["/404"], {replaceUrl: true});
        }
        )), {dispatch: false}
    );

    initSnpStats$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.ActionTypes.InitSnpInfo),
        mergeMap((action: fromActions.InitSnpInfoAction) =>
            combineLatest([
                this.store.select(fromSelectors.selectSnpInfoDataById(action.payload.rsId + action.payload.alt)),
                this.store.select(fromSelectors.selectSnpInfoFdrById(action.payload.rsId + action.payload.alt)),
                this.store.select(fromSelectors.selectSnpInfoEsById(action.payload.rsId + action.payload.alt)),
                this.store.select(fromSelectors.selectSnpInfoDataLoadingById(action.payload.rsId + action.payload.alt)),
            ]).pipe(
                take(1),
                switchMap(([snp, fdr, es, loading]) =>
                    !loading && (!snp || action.payload.fdr !== fdr || action.payload.es !== es)
                        ? of(new fromActions.LoadSnpInfoAction(action.payload))
                        : EMPTY
                ),
            ),
        ),
    ));
}
