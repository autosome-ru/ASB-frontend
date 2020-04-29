import * as fromActions from "src/app/store/action/data.action";
import {ClInfoModel,
    PhenotypesBackendModel,
    PhenotypesModel,
    SnpInfoModel,
    TfInfoModel,
    TotalInfoModel} from "src/app/models/data.model";
import {
    convertClInfoBackendModelToClInfoModel,
    convertSnpInfoBackendModelToSnpInfoModel,
    convertTfInfoBackendModelToTfInfoModel,
    convertTotalInfoBackendModelToTotalInfoModel
} from "../../helpers/snp-model.converter";

export interface DataState {
    totalInfo: TotalInfoModel;
    totalInfoLoading: boolean;

    tfInfo: TfInfoModel[];
    tfInfoLoading: boolean;
    tfInfoInitialized: boolean;

    clInfo: ClInfoModel[];
    clInfoLoading: boolean;
    clInfoInitialized: boolean;

    snps: {
        [snpId: string]: {
            loading: boolean,
            snpData?: SnpInfoModel,
        },
    };
}

export const selectTotalInfo = (state: DataState) => state.totalInfo;
export const selectTotalInfoLoading = (state: DataState) => state.totalInfoLoading;

export const selectTfInfo = (state: DataState) => state.tfInfo;
export const selectTfInfoLoading = (state: DataState) => state.tfInfoLoading;
export const selectTfInfoInitialized = (state: DataState) => state.tfInfoInitialized;

export const selectClInfo = (state: DataState) => state.clInfo;
export const selectClInfoLoading = (state: DataState) => state.clInfoLoading;
export const selectClInfoInitialized = (state: DataState) => state.clInfoInitialized;

export const selectSnps = (state: DataState) => state.snps;


export const initialState: DataState = {
    totalInfo: null,
    tfInfo: [],
    clInfo: [],

    totalInfoLoading: false,
    tfInfoLoading: false,
    clInfoLoading: false,

    tfInfoInitialized: false,
    clInfoInitialized: false,
    snps: {},
};

export function dataReducer(state: DataState = initialState, action: fromActions.ActionUnion): DataState {
    switch (action.type) {

        case fromActions.ActionTypes.LoadTotalInfo: {
            return {
                ...state,
                totalInfoLoading: true
            };
        }

        case fromActions.ActionTypes.LoadTotalInfoSuccess: {
            return {
                ...state,
                totalInfoLoading: false,
                totalInfo: convertTotalInfoBackendModelToTotalInfoModel(action.payload)
            };
        }

        case fromActions.ActionTypes.LoadTotalInfoFail: {
            return {
                ...state,
                totalInfoLoading: false
            };
        }



        case fromActions.ActionTypes.LoadTfInfo: {
            return {
                ...state,
                tfInfoLoading: true
            };
        }

        case fromActions.ActionTypes.LoadTfInfoSuccess: {
            return {
                ...state,
                tfInfoLoading: false,
                tfInfoInitialized: true,
                tfInfo: action.payload.map(convertTfInfoBackendModelToTfInfoModel)
            };
        }

        case fromActions.ActionTypes.LoadTfInfoFail: {
            return {
                ...state,
                tfInfoLoading: false
            };
        }

        case fromActions.ActionTypes.LoadClInfo: {
            return {
                ...state,
                clInfoLoading: true
            };
        }

        case fromActions.ActionTypes.LoadClInfoSuccess: {
            return {
                ...state,
                clInfoLoading: false,
                clInfoInitialized: true,
                clInfo: action.payload.map(convertClInfoBackendModelToClInfoModel)
            };
        }

        case fromActions.ActionTypes.LoadClInfoFail: {
            return {
                ...state,
                clInfoLoading: false
            };
        }


        case fromActions.ActionTypes.LoadSnpInfo: {
            const snpId: string = `${action.payload.rsId}${action.payload.alt}`;
            return {
                ...state,
                snps: {
                    ...state.snps,
                    [snpId]: {
                        loading: true,
                    },
                }

            };
        }
        case fromActions.ActionTypes.LoadSnpInfoSuccess: {
            const newPhenotypes: PhenotypesModel = {
                ebi: [],
                grasp: [],
                clinvar: [],
                phewas: [],
                finemapping: [],
                QTL: [],
            };
            const snpId: string = `rs${action.payload.rs_id}${action.payload.alt}`;
            Object.keys(newPhenotypes).forEach(
                s => newPhenotypes[s] = reduceToDb(s, action.payload.phenotypes)
            );
            return {
                ...state,
                snps: {
                    ...state.snps,
                    [snpId]: {
                        snpData: {
                            ...convertSnpInfoBackendModelToSnpInfoModel(action.payload),
                            phenotypes: newPhenotypes,
                        },
                        loading: false,
                    },
                },
            };
        }
        case fromActions.ActionTypes.LoadSnpInfoFail: {
            return {
                ...state,
                snps: {
                    ...state.snps,
                    [action.payload.rsId + action.payload.alt]: {
                        loading: false,
                    },
                }
            };
        }

        default: {
            return state;
        }
    }
}

function reduceToDb(dbName: string, phenotypes: PhenotypesBackendModel[]): string[] {
    return phenotypes.filter(s => s.db_name === dbName).map(s => s.phenotype_name);
}
