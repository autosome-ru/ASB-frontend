import {Action} from "@ngrx/store";
import {SnpInfoBackendModel, TotalInfoBackendModel} from "src/app/models/data.model";

export enum ActionTypes {
    LoadTotalInfo = "[Data] load total info",
    LoadTotalInfoSuccess = "[Data] total info loaded successfully",
    LoadTotalInfoFail = "[Data] total info loading failed",
    InitTotalInfo = "[Data] init total info",

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
    ;
