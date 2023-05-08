import {Action} from "@ngrx/store";
import {
    AbstractInfoBackendModel,
    SnpInfoBackendModel,
    TotalInfoBackendModel
} from "src/app/models/data.model";
import {AsbServerSideFilterModel} from "src/app/models/table.model";

export enum ActionTypes {
    LoadTotalInfo = "[Data] load total info",
    LoadTotalInfoSuccess = "[Data] total info loaded successfully",
    LoadTotalInfoFail = "[Data] total info loading failed",
    InitTotalInfo = "[Data] init total info",

    LoadFaireInfo = "[Data] load faire info",
    LoadFaireInfoSuccess = "[Data] faire info loaded successfully",
    LoadFaireInfoFail = "[Data] faire info loading failed",

    LoadDnaseInfo = "[Data] load dnase info",
    LoadDnaseInfoSuccess = "[Data] dnase info loaded successfully",
    LoadDnaseInfoFail = "[Data] dnase info loading failed",

    LoadAtacInfo = "[Data] load atac info",
    LoadAtacInfoSuccess = "[Data] atac info loaded successfully",
    LoadAtacInfoFail = "[Data] atac info loading failed",

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


export class LoadFaireInfoAction implements Action {
    readonly type = ActionTypes.LoadFaireInfo;

    constructor(public payload: AsbServerSideFilterModel) {}
}
export class LoadFaireInfoSuccessAction implements Action {
    readonly type = ActionTypes.LoadFaireInfoSuccess;

    constructor(public payload: {results: AbstractInfoBackendModel[], total: number}) {}
}
export class LoadFaireInfoFailAction implements Action {
    readonly type = ActionTypes.LoadFaireInfoFail;
}

export class LoadDnaseInfoAction implements Action {
    readonly type = ActionTypes.LoadDnaseInfo;

    constructor(public payload: AsbServerSideFilterModel) {}
}
export class LoadDnaseInfoSuccessAction implements Action {
    readonly type = ActionTypes.LoadDnaseInfoSuccess;

    constructor(public payload: {results: AbstractInfoBackendModel[], total: number}) {}
}
export class LoadDnaseInfoFailAction implements Action {
    readonly type = ActionTypes.LoadDnaseInfoFail;
}


export class LoadAtacInfoAction implements Action {
    readonly type = ActionTypes.LoadAtacInfo;

    constructor(public payload: AsbServerSideFilterModel) {}
}
export class LoadAtacInfoSuccessAction implements Action {
    readonly type = ActionTypes.LoadAtacInfoSuccess;

    constructor(public payload: {results: AbstractInfoBackendModel[], total: number}) {}
}
export class LoadAtacInfoFailAction implements Action {
    readonly type = ActionTypes.LoadAtacInfoFail;
}




export class LoadSnpInfoAction implements Action {
    readonly type = ActionTypes.LoadSnpInfo;

    constructor(public payload: {rsId: string, alt: string, fdr: string, es: string}) {}
}
export class LoadSnpInfoSuccessAction implements Action {
    readonly type = ActionTypes.LoadSnpInfoSuccess;

    constructor(public payload: {info: SnpInfoBackendModel, fdr: string, es: string}) {}
}
export class LoadSnpInfoFailAction implements Action {
    readonly type = ActionTypes.LoadSnpInfoFail;

    constructor(public payload: {rsId: string, alt: string, fdr: string, es: string}) {}
}
export class InitSnpInfoAction implements Action {
    readonly type = ActionTypes.InitSnpInfo;

    constructor(public payload: {rsId: string, alt: string, fdr: string, es: string}) {}
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

    | LoadFaireInfoAction
    | LoadFaireInfoFailAction
    | LoadFaireInfoSuccessAction

    | LoadAtacInfoAction
    | LoadAtacInfoFailAction
    | LoadAtacInfoSuccessAction

    | LoadDnaseInfoAction
    | LoadDnaseInfoFailAction
    | LoadDnaseInfoSuccessAction
    ;
