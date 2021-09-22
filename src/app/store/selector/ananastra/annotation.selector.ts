import {createSelector} from "@ngrx/store";
import * as fromRoot from "src/app/store/reducer/ananastra";
import * as fromAnnotation from "src/app/store/reducer/ananastra/annotation.reducer";


const _selectAnnotationData = createSelector(fromRoot.selectAnnotation, fromAnnotation.selectAnnotations);
const _selectAnnotationById = (id: string) => createSelector(_selectAnnotationData,
    (annotations) => annotations[id],
);
export const selectAnnotationDataById = (id: string) => createSelector(
    _selectAnnotationById(id),
    ann => ann && ann.annotationData,
);
export const selectProcessingById = (id: string) => createSelector(
    _selectAnnotationById(id),
    ann => ann && ann.processing,
);
export const selectPingDataById = (id: string) => createSelector(
    _selectAnnotationById(id),
    ann => ann && ann.pingData,
);
export const selectPingDataLoadingById = (id: string) => createSelector(
    _selectAnnotationById(id),
    ann => ann && ann.pingLoading,
);
export const selectAnnotationTfTable = (id: string) => createSelector(
    _selectAnnotationById(id),
    ann => ann && ann.tf
);

export const selectAnnotationClTable = (id: string) => createSelector(
    _selectAnnotationById(id),
    ann => ann && ann.cl
);
export const selectAnnotationTfTableSum = (id: string) => createSelector(
    _selectAnnotationById(id),
    ann => ann && ann.tfSum
);

export const selectAnnotationClTableSum = (id: string) => createSelector(
    _selectAnnotationById(id),
    ann => ann && ann.clSum
);
