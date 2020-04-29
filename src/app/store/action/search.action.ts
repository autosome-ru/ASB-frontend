import {Action} from "@ngrx/store";
import {
    SearchHintBackendModel,
    SearchQueryModel, SearchResultsBackendModel,
} from "src/app/models/searchQueryModel";
import {AsbTableChangesModel} from "../../models/table.model";

export enum ActionTypes {
    LoadSearchOptions = "[Search] loading search options",
    LoadSearchOptionsSuccess = "[Search] search options loading successfully",
    LoadSearchOptionsFail = "[Search] search options loading failed",

    LoadSearchResultsWithPagination = "[Search] loading search results with pagination",
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

    constructor(public payload: {search: SearchQueryModel, isAdvanced: boolean, params: AsbTableChangesModel}) {}
}
export class LoadSearchResultsWithPaginationAction implements Action {
    readonly type = ActionTypes.LoadSearchResultsWithPagination;

    constructor(public payload: {isAdvanced: boolean, params: AsbTableChangesModel}) {}
}
export class LoadSearchResultsSuccessAction implements Action {
    readonly type = ActionTypes.LoadSearchResultsSuccess;

    constructor(public payload: SearchResultsBackendModel) {}
}
export class LoadSearchResultsFailAction implements Action {
    readonly type = ActionTypes.LoadSearchResultsFail;

}


export type ActionUnion =
    | LoadSearchOptionsAction
    | LoadSearchOptionsSuccessAction
    | LoadSearchResultsAction
    | LoadSearchResultsWithPaginationAction
    | LoadSearchResultsFailAction
    | LoadSearchResultsSuccessAction
    | LoadSearchOptionsFailAction
    ;
