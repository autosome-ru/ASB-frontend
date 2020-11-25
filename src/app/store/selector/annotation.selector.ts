import {createSelector} from "@ngrx/store";
import * as fromRoot from "../reducer";
import * as fromAnnotation from "src/app/store/reducer/annotation.reducer";
import {AnnotationDataModel, AnnotationSnpModel} from '../../models/annotation.model';

const _selectAnnotationData = createSelector(fromRoot.selectAnnotation, fromAnnotation.selectAnnotations);
const _selectAnnotationById = createSelector(_selectAnnotationData,
    (annotations: {
                [ticket: number]: {
                    annotationData?: AnnotationDataModel,
                    loading: boolean,
                    cl: {data: AnnotationSnpModel[], loading: boolean},
                    tf: {data: AnnotationSnpModel[], loading: boolean},
                    clSum: {data: AnnotationSnpModel[], loading: boolean},
                    tfSum: {data: AnnotationSnpModel[], loading: boolean}
                };
                },
     id: string) => annotations[id] as {
      loading: boolean,
      annotationData?: AnnotationDataModel,
      cl: {data: AnnotationSnpModel[], loading: boolean},
      tf: {data: AnnotationSnpModel[], loading: boolean},
      clSum: {data: AnnotationSnpModel[], loading: boolean},
      tfSum: {data: AnnotationSnpModel[], loading: boolean}
    },
);
export const selectAnnotationDataById = createSelector(
    _selectAnnotationById,
    ann => ann && ann.annotationData,
);
export const selectAnnotationLoadingById = createSelector(
    _selectAnnotationById,
    ann => ann && ann.loading,
);

export const selectAnnotationTfTable = createSelector(
  _selectAnnotationById,
  ann => ann && ann.tf
);

export const selectAnnotationClTable = createSelector(
  _selectAnnotationById,
  ann => ann && ann.cl
);
export const selectAnnotationTfTableSum = createSelector(
  _selectAnnotationById,
  ann => ann && ann.tfSum
);

export const selectAnnotationClTableSum = createSelector(
  _selectAnnotationById,
  ann => ann && ann.clSum
);
