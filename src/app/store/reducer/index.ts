import {searchReducer, SearchState} from "src/app/store/reducer/search.reducer";
import {dataReducer, DataState} from "./data.reducer";

export interface AppState {
    search: SearchState,
    data: DataState
}

export const selectSearch = (state: AppState) => state.search;
export const selectData = (state: AppState) => state.data;

export const asbAppReducer = {
    search: searchReducer,
    data: dataReducer,
};
