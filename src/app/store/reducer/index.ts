import {searchReducer, SearchState} from "@app/store/reducer/search.reducer";

export interface AppState {
    search: SearchState,
}

export const selectSearch = (state: AppState) => state.search;

export const asbAppReducer = {
    search: searchReducer
};
