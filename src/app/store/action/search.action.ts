import {Action} from "@ngrx/store";
import {SearchModel} from "src/app/models/search.model";

export enum ActionTypes {
    SetFilter = "[Search] filter set",
    LoadSearchOptions = "[Search] loading search options",
    LoadSearchOptionsSuccess = "[Search] successful search options loading",

}

export class SetFilterAction implements Action {
    readonly type = ActionTypes.SetFilter;

    constructor(public payload: SearchModel) {}
}
export class LoadSearchOptionsAction implements Action {
    readonly type = ActionTypes.LoadSearchOptions;

    constructor(public payload: SearchModel) {}
}
export class LoadSearchOptionsSuccessAction implements Action {
    readonly type = ActionTypes.LoadSearchOptionsSuccess;

    constructor(public payload: string[]) {}
}


export type ActionUnion =
    | SetFilterAction
    | LoadSearchOptionsAction
    | LoadSearchOptionsSuccessAction
    ;
