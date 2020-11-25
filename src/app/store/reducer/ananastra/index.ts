import {annotationReducer, AnnotationState} from "./annotation.reducer";

export interface AnnotationStoreState {
    annotation: AnnotationState;
}
export const selectAnnotation = (state: AnnotationStoreState) => state.annotation;

export const annotationStoreReducer = {
    annotation: annotationReducer
}
