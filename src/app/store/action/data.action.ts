import {Action} from "@ngrx/store";
import {SnpInfoBackendModel} from "src/app/models/data.model";

export enum ActionTypes {
    LoadSnpInfo = "[Data] load snp info ",
    LoadSnpInfoSuccess = "[Data] snp info loaded successfully",
    LoadSnpInfoFail = "[Data] snp info loading failed",
    InitSnpInfo = "[Data] init snp info"
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
    ;
