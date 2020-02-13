import {Action} from "@ngrx/store";
import {SearchModel} from "src/app/models/search.model";
import {SnpInfoBackendModel} from "../../models/data.model";

export enum ActionTypes {
    SetFilter = "[Search] filter set",
    LoadSearchOptions = "[Search] loading search options",
    LoadSearchOptionsSuccess = "[Search] search options loading successfully",

    LoadSearchResults = "[Search] loading search results",
    LoadSearchResultsSuccess = "[Search] search results loading successfully",
    LoadSearchResultsFail = "[Search] search results loading failed",

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

export class LoadSearchResultsAction implements Action {
    readonly type = ActionTypes.LoadSearchResults;

    constructor(public payload: SearchModel) {}
}
export class LoadSearchResultsSuccessAction implements Action {
    readonly type = ActionTypes.LoadSearchResultsSuccess;

    constructor(public payload: SnpInfoBackendModel[]) {}
}
export class LoadSearchResultsFailAction implements Action {
    readonly type = ActionTypes.LoadSearchResultsFail;

    constructor(public payload: SearchModel) {}
}


export type ActionUnion =
    | SetFilterAction
    | LoadSearchOptionsAction
    | LoadSearchOptionsSuccessAction
    | LoadSearchResultsAction
    | LoadSearchResultsFailAction
    | LoadSearchResultsSuccessAction
    ;
