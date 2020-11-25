import {Action} from '@ngrx/store';
import {AnnotationDataBackendModel, AnnotationSnpBackendModel} from '../../models/annotation.model';
import {TfOrCl} from '../../models/data.model';

export enum ActionTypes {
    StartAnnotation = '[Annotation] Start annotation',
    StartAnnotationSuccess = "[Annotation] Annotation started successfully",
    StartAnnotationFail = "[Annotation] Annotation starting failed",
    InitAnnotationStart = "[Annotation] Init annotation start",

    LoadAnnotationTable = '[Annotation] Load table annotation',
    LoadAnnotationTableSuccess = "[Annotation] Annotation table loaded successfully",
    LoadAnnotationTableFail = "[Annotation] Annotation table load failed",
    InitAnnotationTableLoad = "[Annotation] Init annotation table load",

    LoadAnnotationInfoStats = '[Annotation] load annotation stats',
    LoadAnnotationInfoStatsSuccess = "[Annotation] Annotation stats loaded successfully",
    LoadAnnotationInfoStatsFail = "[Annotation] Load of annotation info stats failed",
}

export class StartAnnotationAction implements Action {
    readonly type = ActionTypes.StartAnnotation;

    constructor(public payload: string) {}
}
export class StartAnnotationSuccessAction implements Action {
    readonly type = ActionTypes.StartAnnotationSuccess;
}
export class StartAnnotationFailAction implements Action {
    readonly type = ActionTypes.StartAnnotationFail;

    constructor(public payload: string) {}
}
export class InitAnnotationStartAction implements Action {
    readonly type = ActionTypes.InitAnnotationStart;

    constructor(public payload: string) {}
}

export class LoadAnnotationStatsAction implements Action {
  readonly type = ActionTypes.LoadAnnotationInfoStats;

  constructor(public payload: string) {}
}
export class LoadAnnotationStatsSuccessAction implements Action {
  readonly type = ActionTypes.LoadAnnotationInfoStatsSuccess;

  constructor(public payload: AnnotationDataBackendModel) {}
}
export class LoadAnnotationStatsFailAction implements Action {
  readonly type = ActionTypes.LoadAnnotationInfoStatsFail;

  constructor(public payload: string) {}
}


export class InitAnnotationTableAction implements Action {
  readonly type = ActionTypes.InitAnnotationTableLoad;

  constructor(public payload: {tfOrCl: TfOrCl, ticket: string, isExpanded: boolean}) {}
}

export class LoadAnnotationTableAction implements Action {
  readonly type = ActionTypes.LoadAnnotationTable;

  constructor(public payload: {tfOrCl: TfOrCl, ticket: string, isExpanded: boolean}) {}
}
export class LoadAnnotationTableSuccessAction implements Action {
  readonly type = ActionTypes.LoadAnnotationTableSuccess;

  constructor(public payload: {
    tfOrCl: TfOrCl,
    ticket: string,
    isExpanded: boolean,
    snps: AnnotationSnpBackendModel[]
  }){}
}
export class LoadAnnotationTableFailAction implements Action {
  readonly type = ActionTypes.LoadAnnotationTableFail;

  constructor(public payload: {tfOrCl: TfOrCl, ticket: string, isExpanded: boolean}) {}
}


export type ActionUnion =
    | StartAnnotationAction
    | StartAnnotationFailAction
    | StartAnnotationSuccessAction
    | InitAnnotationStartAction

    | LoadAnnotationStatsAction
    | LoadAnnotationStatsFailAction
    | LoadAnnotationStatsSuccessAction

    | LoadAnnotationTableAction
    | LoadAnnotationTableFailAction
    | LoadAnnotationTableSuccessAction
    | InitAnnotationTableAction
    ;
