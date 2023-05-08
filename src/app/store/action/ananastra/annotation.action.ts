import {Action} from '@ngrx/store';
import {
    AnnotationDataBackendModel,
    AnnotationSnpBackendModel, BackgroundSelect,
    PingDataBackendModel
} from 'src/app/models/annotation.model';
import {AggType} from 'src/app/models/data.model';
import {AsbServerSideFilterModel, AsbServerSideModel} from "../../../models/table.model";

export enum ActionTypes {
    StartAnnotation = '[Annotation] Start annotation',
    StartAnnotationSuccess = "[Annotation] Annotation started successfully",
    StartAnnotationFail = "[Annotation] Annotation starting failed",
    InitAnnotationStart = "[Annotation] Init annotation start",

    PingAnnotation = '[Annotation] Ping annotation',
    PingAnnotationSuccess = "[Annotation] Annotation pinged successfully",
    PingAnnotationFail = "[Annotation] Annotation pinging failed",
    InitPingAnnotation = "[Annotation] Init ping annotation",

    LoadAnnotationTable = '[Annotation] Load table annotation',
    LoadAnnotationTableSuccess = "[Annotation] Annotation table loaded successfully",
    LoadAnnotationTableFail = "[Annotation] Annotation table load failed",
    InitAnnotationTableLoad = "[Annotation] Init annotation table load",

    LoadAnnotationInfoStats = '[Annotation] load annotation stats',
    LoadAnnotationInfoStatsSuccess = "[Annotation] Annotation stats loaded successfully",
    LoadAnnotationInfoStatsFail = "[Annotation] Load of annotation info stats failed",
    InitAnnotationInfoStats = "[Annotation] Init annotation info stats",
}

export class StartAnnotationAction implements Action {
    readonly type = ActionTypes.StartAnnotation;

    constructor(public payload: {
        fdr: string,
        ticket: string,
        background: BackgroundSelect,
        es: string}) {}
}
export class StartAnnotationSuccessAction implements Action {
    readonly type = ActionTypes.StartAnnotationSuccess;
}
export class StartAnnotationFailAction implements Action {
    readonly type = ActionTypes.StartAnnotationFail;

    constructor(public payload: {
        fdr: string,
        ticket: string,
        background: BackgroundSelect,
        es: string}) {}
}
export class InitAnnotationStartAction implements Action {
    readonly type = ActionTypes.InitAnnotationStart;

    constructor(public payload: {
        fdr: string,
        ticket: string,
        background: BackgroundSelect,
        es: string}) {}
}

export class InitAnnotationInfoStatsAction implements Action {
    readonly type = ActionTypes.InitAnnotationInfoStats;

    constructor(public payload: string) {}
}

export class LoadAnnotationInfoStatsAction implements Action {
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
export class InitPingAnnotationAction implements Action {
    readonly type = ActionTypes.InitPingAnnotation;

    constructor(public payload: string) {}
}
export class PingAnnotationAction implements Action {
    readonly type = ActionTypes.PingAnnotation;

    constructor(public payload: string) {}
}
export class PingAnnotationSuccessAction implements Action {
    readonly type = ActionTypes.PingAnnotationSuccess;

    constructor(public payload: PingDataBackendModel) {}
}
export class PingAnnotationFailAction implements Action {
    readonly type = ActionTypes.PingAnnotationFail;

    constructor(public payload: string) {}
}

export class InitAnnotationTableAction implements Action {
  readonly type = ActionTypes.InitAnnotationTableLoad;

  constructor(public payload: {
      tfOrCl: AggType,
      pagination: AsbServerSideModel,
      ticket: string,
      isExpanded: boolean}) {}
}

export class LoadAnnotationTableAction implements Action {
  readonly type = ActionTypes.LoadAnnotationTable;

  constructor(public payload: {
      tfOrCl: AggType,
      ticket: string,
      pagination: AsbServerSideFilterModel,
      isExpanded: boolean}) {}
}
export class LoadAnnotationTableSuccessAction implements Action {
  readonly type = ActionTypes.LoadAnnotationTableSuccess;

  constructor(public payload: {
    tfOrCl: AggType,
    ticket: string,
    total: number,
    pagination: AsbServerSideFilterModel,
    isExpanded: boolean,
    snps: AnnotationSnpBackendModel[]
  }){}
}
export class LoadAnnotationTableFailAction implements Action {
  readonly type = ActionTypes.LoadAnnotationTableFail;

  constructor(public payload: {
      tfOrCl: AggType,
      pagination: AsbServerSideFilterModel,
      ticket: string,
      isExpanded: boolean}) {}
}


export type ActionUnion =
    | StartAnnotationAction
    | StartAnnotationFailAction
    | StartAnnotationSuccessAction
    | InitAnnotationStartAction

    | LoadAnnotationInfoStatsAction
    | LoadAnnotationStatsFailAction
    | LoadAnnotationStatsSuccessAction
    | InitAnnotationInfoStatsAction

    | LoadAnnotationTableAction
    | LoadAnnotationTableFailAction
    | LoadAnnotationTableSuccessAction
    | InitAnnotationTableAction

    | PingAnnotationAction
    | PingAnnotationSuccessAction
    | PingAnnotationFailAction
    | InitPingAnnotationAction
    ;
