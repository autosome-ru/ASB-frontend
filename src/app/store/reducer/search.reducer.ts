import * as fromActions from "src/app/store/action/search.action";
import {SearchModel} from "src/app/models/search.model";

export interface SearchState {
    searchFilter: SearchModel,
    searchOptions: string[],
    searchOptionsLoading: boolean,
}
export const selectSearchQuery = (state: SearchState) => state.searchFilter;
export const selectSearchOptions = (state: SearchState) => state.searchOptions;
export const selectSearchOptionsLoading = (state: SearchState) => state.searchOptionsLoading;

export const initialState: SearchState = {
    searchFilter: {
        searchInput: "",
        // inTF: false,
        // inCL: false
    },
    searchOptions: [],
    searchOptionsLoading: false,
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
        default: {
            return state;
        }
    }
}
