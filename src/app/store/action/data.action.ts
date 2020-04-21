import {Action} from "@ngrx/store";
import {
    ClInfoBackendModel,
    SnpInfoBackendModel,
    TfInfoBackendModel,
    TotalInfoBackendModel} from "src/app/models/data.model";

export enum ActionTypes {
    LoadTotalInfo = "[Data] load total info",
    LoadTotalInfoSuccess = "[Data] total info loaded successfully",
    LoadTotalInfoFail = "[Data] total info loading failed",
    InitTotalInfo = "[Data] init total info",

    LoadTfInfo = "[Data] load tf info",
    LoadTfInfoSuccess = "[Data] tf info loaded successfully",
    LoadTfInfoFail = "[Data] tf info loading failed",
    InitTfInfo = "[Data] init tf info",

    LoadClInfo = "[Data] load cl info",
    LoadClInfoSuccess = "[Data] cl info loaded successfully",
    LoadClInfoFail = "[Data] cl info loading failed",
    InitClInfo = "[Data] init cl info",

    LoadSnpInfo = "[Data] load snp info ",
    LoadSnpInfoSuccess = "[Data] snp info loaded successfully",
    LoadSnpInfoFail = "[Data] snp info loading failed",
    InitSnpInfo = "[Data] init snp info"
}

export class LoadTotalInfoAction implements Action {
    readonly type = ActionTypes.LoadTotalInfo;
}
export class LoadTotalInfoSuccessAction implements Action {
    readonly type = ActionTypes.LoadTotalInfoSuccess;

    constructor(public payload: TotalInfoBackendModel) {}
}
export class LoadTotalInfoFailAction implements Action {
    readonly type = ActionTypes.LoadTotalInfoFail;
}
export class InitTotalInfoAction implements Action {
    readonly type = ActionTypes.InitTotalInfo;
}


export class LoadTfInfoAction implements Action {
    readonly type = ActionTypes.LoadTfInfo;
}
export class LoadTfInfoSuccessAction implements Action {
    readonly type = ActionTypes.LoadTfInfoSuccess;

    constructor(public payload: TfInfoBackendModel[]) {}
}
export class LoadTfInfoFailAction implements Action {
    readonly type = ActionTypes.LoadTfInfoFail;
}
export class InitTfInfoAction implements Action {
    readonly type = ActionTypes.InitTfInfo;
}

export class LoadClInfoAction implements Action {
    readonly type = ActionTypes.LoadClInfo;
}
export class LoadClInfoSuccessAction implements Action {
    readonly type = ActionTypes.LoadClInfoSuccess;

    constructor(public payload: ClInfoBackendModel[]) {}
}
export class LoadClInfoFailAction implements Action {
    readonly type = ActionTypes.LoadClInfoFail;
}
export class InitClInfoAction implements Action {
    readonly type = ActionTypes.InitClInfo;
}



export class LoadSnpInfoAction implements Action {
    readonly type = ActionTypes.LoadSnpInfo;

    constructor(public payload: {rsId: string, alt: string}) {}
}
export class LoadSnpInfoSuccessAction implements Action {
    readonly type = ActionTypes.LoadSnpInfoSuccess;

    constructor(public payload: SnpInfoBackendModel) {}
}
export class LoadSnpInfoFailAction implements Action {
    readonly type = ActionTypes.LoadSnpInfoFail;

    constructor(public payload: {rsId: string, alt: string}) {}
}
export class InitSnpInfoAction implements Action {
    readonly type = ActionTypes.InitSnpInfo;

    constructor(public payload: {rsId: string, alt: string}) {}
}


export type ActionUnion =
    | LoadSnpInfoAction
    | LoadSnpInfoFailAction
    | LoadSnpInfoSuccessAction
    | InitSnpInfoAction

    | LoadTotalInfoAction
    | LoadTotalInfoFailAction
    | LoadTotalInfoSuccessAction
    | InitTotalInfoAction

    | LoadTfInfoAction
    | LoadTfInfoFailAction
    | LoadTfInfoSuccessAction
    | InitTfInfoAction

    | LoadClInfoAction
    | LoadClInfoFailAction
    | LoadClInfoSuccessAction
    | InitClInfoAction
    ;
