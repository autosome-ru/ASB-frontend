import * as fromActions from "src/app/store/action/search.action";
import {
    SearchHintModel,
    SearchQueryModel,
} from "src/app/models/searchQueryModel";
import {SnpSearchModel} from "../../models/data.model";
import {
    convertSnpSearchBackendModelToSnpSearchModel
} from "../../helpers/snp-model.converter";
import {convertSearchHintBackendModelToSearchHintModel} from "../../helpers/search-model.converter";

export interface SearchState {
    searchFilter: SearchQueryModel;
    searchOptions: {
        tf: SearchHintModel[],
        cl: SearchHintModel[],
    };
    searchOptionsLoading: {
        tf: boolean,
        cl: boolean,
    };
    searchResults: SnpSearchModel[];
    searchResultsLoading: boolean;
}
export const selectSearchQuery = (state: SearchState) => state.searchFilter;
export const selectSearchOptions = (state: SearchState) => state.searchOptions;
export const selectSearchOptionsLoading = (state: SearchState) => state.searchOptionsLoading;

export const selectSearchResults = (state: SearchState) => state.searchResults;
export const selectSearchResultsLoading = (state: SearchState) => state.searchResultsLoading;

export const initialState: SearchState = {
    searchFilter: {
        searchInput: "",
        searchBy: "id",
        chromosome: "1",
        searchByArray: ["tf", "cl"],
        searchCl: "",
        searchTf: "",
        tfList: ["CTCF_HUMAN"],
        clList: []
    },
    searchOptions: {
        tf: [],
        cl: []
    },
    searchOptionsLoading: {
        tf: false,
        cl: false
    },
    searchResults: [],
    searchResultsLoading: false,
};
export function searchReducer(state: SearchState = initialState, action: fromActions.ActionUnion): SearchState {
    switch (action.type) {
        case fromActions.ActionTypes.SetFilter: {
            return {
                ...state,
                searchFilter: action.payload
            };
        }
        case fromActions.ActionTypes.LoadSearchOptions: {

            return {
                ...state,
                searchOptionsLoading: action.payload.tfOrCl === "tf" ?
                    {
                        tf: true,
                        cl: state.searchOptionsLoading.cl
                    } :
                    {
                        tf: state.searchOptionsLoading.tf,
                        cl: true
                    }
            };
        }
        case fromActions.ActionTypes.LoadSearchOptionsSuccess: {
            return {
                ...state,
                searchOptions: action.payload.tfOrCl === "tf" ?
                    {
                        tf: <SearchHintModel[]>action.payload.options.map(convertSearchHintBackendModelToSearchHintModel),
                        cl: state.searchOptions.cl
                    } :
                    {
                        tf: state.searchOptions.tf,
                        cl: <SearchHintModel[]>action.payload.options.map(convertSearchHintBackendModelToSearchHintModel),
                    },
                searchOptionsLoading: action.payload.tfOrCl === "tf" ?
                    {
                        tf: false,
                        cl: state.searchOptionsLoading.cl
                    } :
                    {
                        tf: state.searchOptionsLoading.tf,
                        cl: false
                    }
            };
        }
        case fromActions.ActionTypes.LoadSearchOptionsFail: {
            return {
                ...state,
                searchOptions: action.payload.tfOrCl === "tf" ?
                    {
                        tf: [],
                        cl: state.searchOptions.cl
                    } :
                    {
                        tf: state.searchOptions.tf,
                        cl: []
                    },
                searchOptionsLoading: action.payload.tfOrCl === "tf" ?
                    {
                        tf: false,
                        cl: state.searchOptionsLoading.cl
                    } :
                    {
                        tf: state.searchOptionsLoading.tf,
                        cl: false
                    }
            };
        }
        case fromActions.ActionTypes.LoadSearchResults: {
            return {
                ...state,
                searchResultsLoading: true,
            };
        }
        case fromActions.ActionTypes.LoadSearchResultsSuccess: {
            return {
                ...state,
                searchResults: <any>action.payload.map(convertSnpSearchBackendModelToSnpSearchModel),
                searchResultsLoading: false,
            };
        }
        case fromActions.ActionTypes.LoadSearchResultsFail: {
            if (action.payload.errorCode) {
                return {
                    ...state,
                    searchResultsLoading: false,
                    searchResults: [],
                };
            }
            return {
                ...state,
                searchResults: [],
                searchResultsLoading: false,
            };
        }
        default: {
            return state;
        }
    }
}
