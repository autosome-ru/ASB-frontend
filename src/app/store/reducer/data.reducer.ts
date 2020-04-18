import * as fromActions from "src/app/store/action/data.action";
import {PhenotypesBackendModel, PhenotypesModel, SnpInfoModel, TotalInfoModel} from "src/app/models/data.model";
import {convertSnpInfoBackendModelToSnpInfoModel, convertTotalInfoBackendModelToTotalInfoModel} from "../../helpers/snp-model.converter";

export interface DataState {
    totalInfo: TotalInfoModel;
    totalInfoLoading: boolean;
    snps: {
        [snpId: string]: {
            loading: boolean,
            snpData?: SnpInfoModel,
        },
    };
}

export const selectTotalInfo = (state: DataState) => state.totalInfo;
export const selectTotalInfoLoading = (state: DataState) => state.totalInfoLoading;
export const selectSnps = (state: DataState) => state.snps;


export const initialState: DataState = {
    totalInfo: {
        snpsCount: 0,
        cellTypesCount: 0,
        transcriptionFactorsCount: 0,
    },
    totalInfoLoading: false,
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
