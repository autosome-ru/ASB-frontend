import {Action} from "@ngrx/store";
import {
    SearchByGeneNameHintBackendModel,
    SearchHintBackendModel,
    SearchQueryModel, SearchResultsBackendModel,
} from "src/app/models/search-query.model";
import {AsbServerSideModel} from "src/app/models/table.model";

export enum ActionTypes {
    LoadSearchOptions = "[Search] loading search options",
    LoadSearchOptionsSuccess = "[Search] search options loading successfully",
    LoadSearchOptionsFail = "[Search] search options loading failed",

    LoadSearchByGeneNameOptions = "[Search] loading search options by gene name",
    LoadSearchByGeneNameOptionsSuccess = "[Search] search options loading by gene name successfully",
    LoadSearchByGeneNameOptionsFail = "[Search] search options loading by gene name failed",

    LoadSearchResults = "[Search] loading search results",
    LoadSearchResultsWithPagination = "[Search] loading search results with pagination",
    LoadSearchResultsSuccess = "[Search] search results loading successfully",
    LoadSearchResultsFail = "[Search] search results loading failed",
}


export class LoadSearchByGeneNameOptionsAction implements Action {
    readonly type = ActionTypes.LoadSearchByGeneNameOptions;

    constructor(public payload: string) {}
}
export class LoadSearchByGeneNameOptionsSuccessAction implements Action {
    readonly type = ActionTypes.LoadSearchByGeneNameOptionsSuccess;

    constructor(public payload: SearchByGeneNameHintBackendModel[]) {}
}
export class LoadSearchByGeneNameOptionsFailAction implements Action {
    readonly type = ActionTypes.LoadSearchByGeneNameOptionsFail;

    constructor(public payload: string) {}
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

    constructor(public payload: {
        fdr: string,
        search: SearchQueryModel,
        params: AsbServerSideModel}) {}
}
export class LoadSearchResultsWithPaginationAction implements Action {
    readonly type = ActionTypes.LoadSearchResultsWithPagination;

    constructor(public payload: {params: AsbServerSideModel, fdr: string}) {}
}
export class LoadSearchResultsSuccessAction implements Action {
    readonly type = ActionTypes.LoadSearchResultsSuccess;

    constructor(public payload: {results: SearchResultsBackendModel, fdr: string}) {}
}
export class LoadSearchResultsFailAction implements Action {
    readonly type = ActionTypes.LoadSearchResultsFail;

}


export type ActionUnion =
    | LoadSearchOptionsAction
    | LoadSearchOptionsSuccessAction
    | LoadSearchOptionsFailAction

    | LoadSearchByGeneNameOptionsAction
    | LoadSearchByGeneNameOptionsSuccessAction
    | LoadSearchByGeneNameOptionsFailAction

    | LoadSearchResultsAction
    | LoadSearchResultsWithPaginationAction
    | LoadSearchResultsFailAction
    | LoadSearchResultsSuccessAction
    ;
