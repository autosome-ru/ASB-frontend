import {Action} from "@ngrx/store";
import {ReleaseModel} from "../../models/releases.model";

export enum ActionTypes {
    GetCurrentRelease = "[Releases] get release name",
    GetCurrentReleaseSuccess = "[Releases] get release name success",
    GetCurrentReleaseFail = "[Releases] set release name failed",
}

export class GetCurrentReleaseAction implements Action {
    readonly type = ActionTypes.GetCurrentRelease;

}
export class GetCurrentReleaseActionSuccess implements Action {
    readonly type = ActionTypes.GetCurrentReleaseSuccess;

    constructor(public payload: ReleaseModel) {}

}
export class GetCurrentReleaseActionFail implements Action {
    readonly type = ActionTypes.GetCurrentReleaseFail;

}


export type ActionUnion =
    | GetCurrentReleaseAction
    | GetCurrentReleaseActionFail
    | GetCurrentReleaseActionSuccess

    ;
