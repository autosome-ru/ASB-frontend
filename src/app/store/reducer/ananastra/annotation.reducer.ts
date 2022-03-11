import * as fromActions from "src/app/store/action/ananastra/annotation.action";
import {AnnotationDataModel, AnnotationSnpModel, PingDataModel} from '../../../models/annotation.model';
import {
    convertAnnotationBackendToAnnotationModel,
    convertAnnotationSnpBackendToAnnotationSnpModel, convertPingBackendToPingModel
} from '../../../helpers/converters/annotation.converter';
import {AsbServerSideModel} from "../../../models/table.model";

export interface TicketState {
    processing: boolean
    pingLoading: boolean,
    pingData?: PingDataModel
    annotationData?: {
        data?: AnnotationDataModel,
        loading: boolean
    },

    tf?: {
        data?: AnnotationSnpModel[],
        loading: boolean,
        total: number,
        pagination?: AsbServerSideModel,
    },
    cl?: {
        data?: AnnotationSnpModel[],
        loading: boolean,
        total: number,
        pagination?: AsbServerSideModel,
    },
    tfSum?: {
        data?: AnnotationSnpModel[],
        pagination?: AsbServerSideModel,
        total: number,
        loading: boolean
    },
    clSum?: {
        data?: AnnotationSnpModel[],
        pagination?: AsbServerSideModel,
        total: number,
        loading: boolean
    }
}
export interface AnnotationState {
    annotations: {
        [ticket: string]: TicketState
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
                    [action.payload.ticket]: {
                        ...state.annotations[action.payload.ticket],
                        processing: true,
                    },
                }

            };
        }
        case fromActions.ActionTypes.StartAnnotationFail: {
            return {
                ...state,
                annotations: {
                    ...state.annotations,
                    [action.payload.ticket]: {
                        ...state.annotations[action.payload.ticket],
                        processing: false
                    },
                }
            };
        }
        case fromActions.ActionTypes.PingAnnotation: {
            return {
                ...state,
                annotations: {
                    ...state.annotations,
                    [action.payload]: {
                        ...state.annotations[action.payload],
                        pingLoading: true
                    }
                }
            }
        }
        case fromActions.ActionTypes.PingAnnotationFail: {
            return {
                ...state,
                annotations: {
                    ...state.annotations,
                    [action.payload]: {
                        ...state.annotations[action.payload],
                        pingLoading: false
                    }
                }
            }
        }
        case fromActions.ActionTypes.PingAnnotationSuccess: {
            let ticketData ={
                ...state.annotations[action.payload.ticket_id],
                pingLoading: false,
                processing: action.payload.status !== 'Processed' && action.payload.status !== 'Failed',
                pingData: convertPingBackendToPingModel(action.payload),
            }
            return {
                ...state,
                annotations: {
                    ...state.annotations,
                    [action.payload.ticket_id]: ticketData
                }
            }
        }
        case fromActions.ActionTypes.LoadAnnotationInfoStats: {
            return {
                ...state,
                annotations: {
                    ...state.annotations,
                    [action.payload]: {
                        ...state.annotations[action.payload],
                        annotationData: {
                            loading: true,
                        }
                    },
                }
            };
        }
        case fromActions.ActionTypes.LoadAnnotationInfoStatsSuccess: {
            return {
                ...state,
                annotations: {
                    ...state.annotations,
                    [action.payload.ticket_id]: {
                        ...state.annotations[action.payload.ticket_id],
                        annotationData: {
                            loading: false,
                            data: convertAnnotationBackendToAnnotationModel(action.payload)
                        }
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
                        ...state.annotations[action.payload],
                        annotationData: {
                            loading: false
                        }
                    },
                }
            };
        }

        case fromActions.ActionTypes.LoadAnnotationTable: {
            const tableId = action.payload.tfOrCl + (action.payload.isExpanded ? '' : 'Sum')
            return {
                ...state,
                annotations: {
                    ...state.annotations,
                    [action.payload.ticket]: {
                        ...state.annotations[action.payload.ticket],
                        [tableId]: {
                            ...state.annotations[action.payload.ticket][tableId],
                            loading: true
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
                            pagination: action.payload.pagination,
                            total: action.payload.total,
                            data: action.payload.snps.map(convertAnnotationSnpBackendToAnnotationSnpModel)
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
        default: {
            return state;
        }
    }
}
