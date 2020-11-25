import {searchReducer, SearchState} from "src/app/store/reducer/adastra/search.reducer";
import {dataReducer, DataState} from "./data.reducer";
import {releaseReducer, ReleaseState} from "./releases.reducer";

export interface AppState {
    search: SearchState;
    data: DataState;
    release: ReleaseState;
}

export const selectSearch = (state: AppState) => state.search;
export const selectData = (state: AppState) => state.data;
export const selectRelease = (state: AppState) => state.release;

export const asbAppReducer = {
    search: searchReducer,
    data: dataReducer,
    release: releaseReducer,
};
