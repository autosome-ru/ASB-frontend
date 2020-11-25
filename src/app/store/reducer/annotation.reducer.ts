import * as fromActions from "src/app/store/action/annotation.action";
import {AnnotationDataModel, AnnotationSnpModel} from '../../models/annotation.model';
import {
  convertAnnotationBackendToAnnotationModel,
  convertAnnotationSnpBackendToAnnotationSnpModel
} from '../../helpers/converters/annotation.converter';


export interface AnnotationState {
    annotations: {
        [ticket: string]: {
            loading: boolean,
            annotationData?: AnnotationDataModel,
            tf?: {
              data?: AnnotationSnpModel[],
              loading: boolean
            },
            cl?: {
              data?: AnnotationSnpModel[],
              loading: boolean
            },
            tfSum?: {
              data?: AnnotationSnpModel[],
              loading: boolean
            },
            clSum?: {
              data?: AnnotationSnpModel[],
              loading: boolean
            }
        },
    };
}

export const selectAnnotations = (state: AnnotationState) => state.annotations;


export const initialState: AnnotationState = {
    annotations: {},
};

export function annotationReducer(state: AnnotationState = initialState, action: fromActions.ActionUnion): AnnotationState {
    switch (action.type) {
        case fromActions.ActionTypes.StartAnnotation: {
            return {
                ...state,
                annotations: {
                    ...state.annotations,
                    [action.payload]: {
                        loading: true,
                    },
                }

            };
        }
        case fromActions.ActionTypes.StartAnnotationFail: {
            return {
                ...state,
                annotations: {
                    ...state.annotations,
                    [action.payload]: {
                        loading: false,
                    },
                }
            };
        }
      case fromActions.ActionTypes.LoadAnnotationInfoStatsSuccess: {
        const isLoading = action.payload.status === 'Processed' || action.payload.status === 'Failed';
        console.log(isLoading, convertAnnotationBackendToAnnotationModel(action.payload));
        return {
          ...state,
          annotations: {
            ...state.annotations,
            [action.payload.ticket_id]: {
              loading: !isLoading,
              annotationData: isLoading ? convertAnnotationBackendToAnnotationModel(action.payload) : null
            },
          }
        };
      }
      case fromActions.ActionTypes.LoadAnnotationInfoStatsFail: {
        return {
          ...state,
          annotations: {
            ...state.annotations,
            [action.payload]: {
              loading: false,
            },
          }
        };
      }

      case fromActions.ActionTypes.LoadAnnotationTable: {
          return {
            ...state,
            annotations: {
              ...state.annotations,
              [action.payload.ticket]: {
                ...state.annotations[action.payload.ticket],
                [action.payload.tfOrCl + (action.payload.isExpanded ? '' : 'Sum')]: {
                  loading: true
                }
              }
            }
          };
        }
      case fromActions.ActionTypes.LoadAnnotationTableFail: {
        return {
          ...state,
          annotations: {
            ...state.annotations,
            [action.payload.ticket]: {
              ...state.annotations[action.payload.ticket],
              [action.payload.tfOrCl + (action.payload.isExpanded ? '' : 'Sum')]: {
                loading: false
              }
            }
          }
        };
      }
      case fromActions.ActionTypes.LoadAnnotationTableSuccess: {
        return {
          ...state,
          annotations: {
            ...state.annotations,
            [action.payload.ticket]: {
              ...state.annotations[action.payload.ticket],
              [action.payload.tfOrCl + (action.payload.isExpanded ? '' : 'Sum')]: {
                loading: false,
                data: action.payload.snps.map(convertAnnotationSnpBackendToAnnotationSnpModel)
              }
            }
          }
        };
      }

      default: {
          return state;
      }
    }
}
