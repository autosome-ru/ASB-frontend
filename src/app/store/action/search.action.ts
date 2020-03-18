import {Action} from "@ngrx/store";
import {SearchQueryModel} from "src/app/models/searchQueryModel";
import {SnpSearchBackendModel} from "../../models/data.model";

export enum ActionTypes {
    SetFilter = "[Search] filter set",
    LoadSearchOptions = "[Search] loading search options",
    LoadSearchOptionsSuccess = "[Search] search options loading successfully",
    LoadSearchOptionsFail = "[Search] search options loading failed",

    LoadSearchResults = "[Search] loading search results",
    LoadSearchResultsSuccess = "[Search] search results loading successfully",
    LoadSearchResultsFail = "[Search] search results loading failed",

}

export class SetFilterAction implements Action {
    readonly type = ActionTypes.SetFilter;

    constructor(public payload: SearchQueryModel) {}
}
export class LoadSearchOptionsAction implements Action {
    readonly type = ActionTypes.LoadSearchOptions;

    constructor(public payload: {search: SearchQueryModel, tfOrCl: "tf" | "cl"}) {}
}
export class LoadSearchOptionsSuccessAction implements Action {
    readonly type = ActionTypes.LoadSearchOptionsSuccess;

    constructor(public payload: {options: string[], tfOrCl: "tf" | "cl"}) {}
}

export class LoadSearchOptionsFailAction implements Action {
    readonly type = ActionTypes.LoadSearchOptionsFail;

    constructor(public payload: {search: SearchQueryModel, tfOrCl: "tf" | "cl"}) {}
}

export class LoadSearchResultsAction implements Action {
    readonly type = ActionTypes.LoadSearchResults;

    constructor(public payload: {search: SearchQueryModel, isAdvanced: boolean}) {}
}
export class LoadSearchResultsSuccessAction implements Action {
    readonly type = ActionTypes.LoadSearchResultsSuccess;

    constructor(public payload: SnpSearchBackendModel[]) {}
}
export class LoadSearchResultsFailAction implements Action {
    readonly type = ActionTypes.LoadSearchResultsFail;

    constructor(public payload: {
        search: SearchQueryModel,
        isAdvanced: boolean,
        errorCode?: number}) {}
}


export type ActionUnion =
    | SetFilterAction
    | LoadSearchOptionsAction
    | LoadSearchOptionsSuccessAction
    | LoadSearchResultsAction
    | LoadSearchResultsFailAction
    | LoadSearchResultsSuccessAction
    | LoadSearchOptionsFailAction
    ;
