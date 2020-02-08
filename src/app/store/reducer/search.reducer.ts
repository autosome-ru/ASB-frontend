import * as fromActions from "@app/store/action/search.action";
import {SearchModel} from "@app/models/search.model";

export interface SearchState {
    search: SearchModel
}
export const selectSearchQuery = (state: SearchState) => state.search;

export const initialState: SearchState = {
    search: {
        searchInput: "",
        // inTF: false,
        // inCL: false
    }
};
export function searchReducer(state: SearchState = initialState, action: fromActions.ActionUnion): SearchState {
    switch (action.type) {
        case fromActions.ActionTypes.SetFilter: {
            return {
                ...state,
                search: action.payload
            };
        }
        default: {
            return state;
        }
    }
}
