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
        atac: SearchHintModel[],
        dnase: SearchHintModel[],
        faire: SearchHintModel[],
    };
    searchOptionsLoading: {
        atac: boolean,
        dnase: boolean,
        faire: boolean,
    };

    searchByGeneNameOptions: GeneModel[];
    searchByGeneNameOptionsLoading: boolean;
    searchGene: GeneModel;

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
        atac: [],
        dnase: [],
        faire: []
    },
    searchByGeneNameOptions: [],
    searchByGeneNameOptionsLoading: false,
    searchGene: null,

    searchQuery: null,
    searchOptionsLoading: {
        atac: false,
        dnase: false,
        faire: false,
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
                searchOptionsLoading: {
                        [action.payload.aggType]: true,
                        ...state.searchOptionsLoading
                    }
            };
        }
        case fromActions.ActionTypes.LoadSearchByGeneNameOptions: {
            return {
                ...state,
                searchByGeneNameOptionsLoading: true
            };
        }
        case fromActions.ActionTypes.LoadSearchByGeneNameOptionsSuccess: {
            return {
                ...state,
                searchByGeneNameOptions: action.payload.map(convertSearchByGeneNameHintBackendToSearchByGeneHintModel),
                searchByGeneNameOptionsLoading: false
            };
        }
        case fromActions.ActionTypes.LoadSearchByGeneNameOptionsFail: {
            return {
                ...state,
                searchByGeneNameOptions: [],
                searchByGeneNameOptionsLoading: false
            };
        }
        case fromActions.ActionTypes.LoadSearchOptionsSuccess: {
            return {
                ...state,
                searchOptions: {
                    ...state.searchOptions,
                    [action.payload.aggType]: action.payload.options.map(
                        convertSearchHintBackendModelToSearchHintModel) as SearchHintModel[],
                },
                searchOptionsLoading: {
                    [action.payload.aggType]: false,
                    ...state.searchOptionsLoading
                }
            };
        }
        case fromActions.ActionTypes.LoadSearchOptionsFail: {
            return {
                ...state,
                searchOptions: {
                    ...state.searchOptions,
                    [action.payload.aggType]: [],
                },
                searchOptionsLoading: {
                    [action.payload.aggType]: false,
                    ...state.searchOptionsLoading
                }
            };
        }
        case fromActions.ActionTypes.LoadSearchResults: {
            return {

                ...state,
                searchResultsLoading: true,
                searchQuery: {
                    ...action.payload.search,
                    ...action.payload.params,
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
                    ...action.payload.params,
                    fdr: action.payload.fdr,
                    es: action.payload.es
                }
            };
        }

        case fromActions.ActionTypes.LoadSearchResultsSuccess: {
            return {
                ...state,
                searchGene: convertSearchByGeneNameHintBackendToSearchByGeneHintModel(
                    action.payload.results.gene),
                searchResults: {
                    total: action.payload.results.total,
                    results: action.payload.results.results.map(
                        s => convertSnpSearchBackendModelToSnpSearchModel(s, action.payload.fdr, action.payload.es)) as SnpSearchModel[]
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
