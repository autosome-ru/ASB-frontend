import {searchReducer, SearchState} from "src/app/store/reducer/search.reducer";
import {dataReducer, DataState} from "./data.reducer";
import {releaseReducer, ReleaseState} from "./releases.reducer";
import {annotationReducer, AnnotationState} from "./annotation.reducer";

export interface AppState {
    search: SearchState;
    data: DataState;
    release: ReleaseState;
    annotation: AnnotationState;
}

export const selectSearch = (state: AppState) => state.search;
export const selectData = (state: AppState) => state.data;
export const selectRelease = (state: AppState) => state.release;
export const selectAnnotation = (state: AppState) => state.annotation;

export const asbAppReducer = {
    search: searchReducer,
    data: dataReducer,
    release: releaseReducer,
    annotation: annotationReducer
};
