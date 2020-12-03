import {createSelector} from "@ngrx/store";
import * as fromRoot from "src/app/store/reducer/ananastra";
import * as fromAnnotation from "src/app/store/reducer/ananastra/annotation.reducer";
import {AnnotationDataModel, AnnotationSnpModel, PingDataModel} from 'src/app/models/annotation.model';
import {TicketState} from "src/app/store/reducer/ananastra/annotation.reducer";

const _selectAnnotationData = createSelector(fromRoot.selectAnnotation, fromAnnotation.selectAnnotations);
const _selectAnnotationById = createSelector(_selectAnnotationData,
    (annotations: {
         [ticket: number]: {
             annotationData?: {
                 data?: AnnotationDataModel,
                 loading: boolean
             },
             processing: boolean,
             pingLoading: boolean,
             pingData: PingDataModel,
             cl: {data: AnnotationSnpModel[], loading: boolean},
             tf: {data: AnnotationSnpModel[], loading: boolean},
             clSum: {data: AnnotationSnpModel[], loading: boolean},
             tfSum: {data: AnnotationSnpModel[], loading: boolean}
         };
     },
     id: string) => annotations[id] as TicketState,
);
export const selectAnnotationDataById = createSelector(
    _selectAnnotationById,
    ann => ann && ann.annotationData,
);
export const selectProcessingById = createSelector(
    _selectAnnotationById,
    ann => ann && ann.processing,
);
export const selectPingDataById = createSelector(
    _selectAnnotationById,
    ann => ann && ann.pingData,
);
export const selectPingDataLoadingById = createSelector(
    _selectAnnotationById,
    ann => ann && ann.pingLoading,
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
