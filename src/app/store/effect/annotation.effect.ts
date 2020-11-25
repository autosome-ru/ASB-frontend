import {Actions, Effect, ofType} from "@ngrx/effects";
import * as fromActions from "src/app/store/action/annotation.action";
import {catchError, map, mergeMap, switchMap, take} from "rxjs/operators";
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppState} from "src/app/store";
import * as fromSelectors from "src/app/store/selector";
import {ProcessingService} from '../../services/processing.service';
import {AnnotationSnpModel} from '../../models/annotation.model';

@Injectable()
export class AnnotationEffect {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private processingService: ProcessingService,
    ) { }
    @Effect()
    loadAnnotationInfoStart$ = this.actions$.pipe(
        ofType(fromActions.ActionTypes.StartAnnotation),
        mergeMap((action: fromActions.StartAnnotationAction) =>
            this.processingService.startProcessTicket(action.payload).pipe(
                map(() => new fromActions.StartAnnotationSuccessAction()),
                catchError(() => of(new fromActions.StartAnnotationFailAction(action.payload))),
            )
        )
    );
    @Effect()
    loadAnnotationInfoStartFail$ = this.actions$.pipe(
        ofType(fromActions.ActionTypes.StartAnnotationFail),
        mergeMap(() => {
            return EMPTY;
        }),
    );

  @Effect()
  loadAnnotationStats$ = this.actions$.pipe(
    ofType(fromActions.ActionTypes.LoadAnnotationInfoStats),
    mergeMap((action: fromActions.LoadAnnotationStatsAction) =>
      this.processingService.getFileStatsByTicket(action.payload).pipe(
        map(info => new fromActions.LoadAnnotationStatsSuccessAction(info)),
        catchError(() => of(new fromActions.LoadAnnotationStatsFailAction(action.payload))),
      )
    )
  );
  @Effect()
  loadAnnotationStatsFail$ = this.actions$.pipe(
    ofType(fromActions.ActionTypes.LoadAnnotationInfoStatsFail),
    mergeMap(() => {
      return EMPTY;
    }),
  );

  @Effect()
  initAnnotationInfo$ = this.actions$.pipe(
      ofType(fromActions.ActionTypes.InitAnnotationStart),
      mergeMap((action: fromActions.InitAnnotationStartAction) =>
          combineLatest([
              this.store.select(fromSelectors.selectAnnotationDataById, action.payload),
              this.store.select(fromSelectors.selectAnnotationLoadingById, action.payload),
          ]).pipe(
              take(1),
              switchMap(([snp, loading]) =>
                  !loading && !snp
                      ? of(new fromActions.StartAnnotationAction(action.payload))
                      : EMPTY
              ),
          ),
      ),
  );

  @Effect()
  loadAnnotationTable$ = this.actions$.pipe(
    ofType(fromActions.ActionTypes.LoadAnnotationTable),
    mergeMap((action: fromActions.LoadAnnotationTableAction) =>
      this.processingService.getTableData(action.payload.ticket,
        action.payload.tfOrCl, action.payload.isExpanded)
        .pipe(
        map(snps => new fromActions.LoadAnnotationTableSuccessAction(
          {
            snps,
            tfOrCl: action.payload.tfOrCl,
            ticket: action.payload.ticket,
            isExpanded: action.payload.isExpanded
          })),
        catchError(() => of(new fromActions.LoadAnnotationTableFailAction(
          action.payload))),
      )
    )
  );
  @Effect()
  loadAnnotationTableFail$ = this.actions$.pipe(
    ofType(fromActions.ActionTypes.LoadAnnotationInfoStatsFail),
    mergeMap(() => {
      return EMPTY;
    }),
  );

  @Effect()
  initAnnotationTable$ = this.actions$.pipe(
    ofType(fromActions.ActionTypes.InitAnnotationTableLoad),
    mergeMap((action: fromActions.InitAnnotationTableAction) => {
      let obs: Observable<{data: AnnotationSnpModel[], loading: boolean}>;
      if (action.payload.tfOrCl === 'tf' ) {
        obs = action.payload.isExpanded ?
          this.store.select(fromSelectors.selectAnnotationTfTable, action.payload.ticket) :
          this.store.select(fromSelectors.selectAnnotationTfTableSum, action.payload.ticket);
      } else {
        obs = action.payload.isExpanded ?
          this.store.select(fromSelectors.selectAnnotationClTable, action.payload.ticket) :
          this.store.select(fromSelectors.selectAnnotationClTableSum, action.payload.ticket);
      }
      return obs.pipe(
          take(1),
          switchMap((d) =>
            !d || (!d.loading && !d.data)
              ? of(new fromActions.LoadAnnotationTableAction(action.payload))
              : EMPTY
          ),
        );
      }
    ),
  );

}
