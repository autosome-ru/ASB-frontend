import {Action} from "@ngrx/store";
import {SearchModel} from "src/app/models/search.model";

export enum ActionTypes {
    SetFilter = "[Search] filter set",
}

export class SetFilterAction implements Action {
    readonly type = ActionTypes.SetFilter;

    constructor(public payload: SearchModel) {}
}

export type ActionUnion =
    | SetFilterAction
    ;
