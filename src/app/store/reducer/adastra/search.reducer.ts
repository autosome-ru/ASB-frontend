import * as fromActions from "src/app/store/action/adastra/search.action";
import {
    GeneModel,
    SearchHintModel,
    SearchQueryModel,
    SearchResultsModel
} from "src/app/models/search-query.model";
import {
    convertSnpSearchBackendModelToSnpSearchModel
} from "../../../helpers/converters/snp-model.converter";
import {
    convertSearchByGeneNameHintBackendToSearchByGeneHintModel,
    convertSearchHintBackendModelToSearchHintModel
} from "../../../helpers/converters/search-model.converter";
import {SnpSearchModel} from "../../../models/data.model";

export interface SearchState {
    searchOptions: {
        tf: SearchHintModel[],
        cl: SearchHintModel[],
    };
    searchOptionsLoading: {
        tf: boolean,
        cl: boolean,
    };

    searchByGeneNameOptions: GeneModel[],
    searchByGeneNameOptionsLoading: boolean,
    searchGene: GeneModel,

    searchQuery: SearchQueryModel;

    searchResults: SearchResultsModel;
    searchResultsLoading: boolean;
    searchChangeLoading: boolean;
}
export const selectSearchOptions = (state: SearchState) => state.searchOptions;
export const selectSearchOptionsLoading = (state: SearchState) => state.searchOptionsLoading;

export const selectSearchByGeneNameOptions = (state: SearchState) => state.searchByGeneNameOptions;
export const selectSearchByGeneNameOptionsLoading = (state: SearchState) =>
    state.searchByGeneNameOptionsLoading;

export const selectCurrentSelectedGene = (state: SearchState) => state.searchGene;

export const selectSearchQuery = (state: SearchState) => state.searchQuery;
export const selectSearchResults = (state: SearchState) => state.searchResults;
export const selectSearchResultsLoading = (state: SearchState) => state.searchResultsLoading;
export const selectResultsChange = (state: SearchState) => state.searchChangeLoading;

export const initialState: SearchState = {
    searchOptions: {
        tf: [],
        cl: []
    },
    searchByGeneNameOptions: [],
    searchByGeneNameOptionsLoading: false,
    searchGene: null,

    searchQuery: null,
    searchOptionsLoading: {
        tf: false,
        cl: false
    },
    searchResults: {
        total: null,
        results: []
    },
    searchResultsLoading: false,
    searchChangeLoading: false
};
export function searchReducer(state: SearchState = initialState, action: fromActions.ActionUnion): SearchState {
    switch (action.type) {
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
        case fromActions.ActionTypes.LoadSearchByGeneNameOptions: {
            return {
                ...state,
                searchByGeneNameOptionsLoading: true
            }
        }
        case fromActions.ActionTypes.LoadSearchByGeneNameOptionsSuccess: {
            return {
                ...state,
                searchByGeneNameOptions: action.payload.map(convertSearchByGeneNameHintBackendToSearchByGeneHintModel),
                searchByGeneNameOptionsLoading: false
            }
        }
        case fromActions.ActionTypes.LoadSearchByGeneNameOptionsFail: {
            return {
                ...state,
                searchByGeneNameOptions: [],
                searchByGeneNameOptionsLoading: false
            }
        }
        case fromActions.ActionTypes.LoadSearchOptionsSuccess: {
            return {
                ...state,
                searchOptions: action.payload.tfOrCl === "tf" ?
                    {
                        tf: action.payload.options.map(convertSearchHintBackendModelToSearchHintModel) as SearchHintModel[],
                        cl: state.searchOptions.cl
                    } :
                    {
                        tf: state.searchOptions.tf,
                        cl: action.payload.options.map(convertSearchHintBackendModelToSearchHintModel) as SearchHintModel[],
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
                searchQuery: {
                    ...action.payload.search,
                    ...action.payload.params
                },
                searchChangeLoading: true,
            };
        }

        case fromActions.ActionTypes.LoadSearchResultsWithPagination: {
            return {
                ...state,
                searchChangeLoading: true,
                searchQuery: {
                    ...state.searchQuery,
                    ...action.payload.params
                }
            };
        }

        case fromActions.ActionTypes.LoadSearchResultsSuccess: {
            return {
                ...state,
                searchGene: convertSearchByGeneNameHintBackendToSearchByGeneHintModel(
                    action.payload.gene),
                searchResults: {
                    total: action.payload.total,
                    results: action.payload.results.map(
                        convertSnpSearchBackendModelToSnpSearchModel) as SnpSearchModel[]
                },
                searchResultsLoading: false,
                searchChangeLoading: false
            };
        }
        case fromActions.ActionTypes.LoadSearchResultsFail: {
            return {
                ...state,
                searchResults: {results: [], total: null},
                searchResultsLoading: false,
                searchChangeLoading: false
            };
        }
        default: {
            return state;
        }
    }
}
