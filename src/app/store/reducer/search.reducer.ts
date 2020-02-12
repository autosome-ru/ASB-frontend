import * as fromActions from "src/app/store/action/search.action";
import {SearchModel} from "src/app/models/search.model";
import {SnpInfoModel} from "../../models/data.model";

export interface SearchState {
    searchFilter: SearchModel,
    searchOptions: string[],
    searchOptionsLoading: boolean,

    searchResults: SnpInfoModel[];
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
        // inTF: false,
        // inCL: false
    },
    searchOptions: [],
    searchOptionsLoading: false,
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
                searchOptionsLoading: true,
            }
        }
        case fromActions.ActionTypes.LoadSearchOptionsSuccess: {
            return {
                ...state,
                searchOptions: action.payload,
                searchOptionsLoading: false,
            }
        }
        case fromActions.ActionTypes.LoadSearchResults: {
            return {
                ...state,
                searchResultsLoading: true,
            }
        }
        case fromActions.ActionTypes.LoadSearchResultsSuccess: {
            return {
                ...state,
                searchResults: action.payload,
                searchResultsLoading: false,
            }
        }
        case fromActions.ActionTypes.LoadSearchResultsFail: {
            return {
                ...state,
                searchResultsLoading: false,
            }
        }
        default: {
            return state;
        }
    }
}
