import {Action} from "@ngrx/store";
import {
    SearchHintBackendModel,
    SearchQueryModel, SearchResultsBackendModel,
} from "src/app/models/searchQueryModel";
import {SnpSearchBackendModel} from "../../models/data.model";

export enum ActionTypes {
    LoadSearchOptions = "[Search] loading search options",
    LoadSearchOptionsSuccess = "[Search] search options loading successfully",
    LoadSearchOptionsFail = "[Search] search options loading failed",

    LoadSearchResults = "[Search] loading search results",
    LoadSearchResultsSuccess = "[Search] search results loading successfully",
    LoadSearchResultsFail = "[Search] search results loading failed",

}

export class LoadSearchOptionsAction implements Action {
    readonly type = ActionTypes.LoadSearchOptions;

    constructor(public payload: {search: SearchQueryModel, tfOrCl: "tf" | "cl"}) {}
}
export class LoadSearchOptionsSuccessAction implements Action {
    readonly type = ActionTypes.LoadSearchOptionsSuccess;

    constructor(public payload: {options:
            SearchHintBackendModel[],
        tfOrCl: "tf" | "cl"
    }) {}
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

    constructor(public payload: SearchResultsBackendModel) {}
}
export class LoadSearchResultsFailAction implements Action {
    readonly type = ActionTypes.LoadSearchResultsFail;

    constructor(public payload: {
        search: SearchQueryModel,
        isAdvanced: boolean }) {}
}


export type ActionUnion =
    | LoadSearchOptionsAction
    | LoadSearchOptionsSuccessAction
    | LoadSearchResultsAction
    | LoadSearchResultsFailAction
    | LoadSearchResultsSuccessAction
    | LoadSearchOptionsFailAction
    ;
