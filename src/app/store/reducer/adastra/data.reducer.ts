import * as fromActions from "src/app/store/action/adastra/data.action";
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
} from "../../../helpers/converters/snp-model.converter";

export interface DataState {
    totalInfo: TotalInfoModel;
    totalInfoLoading: boolean;

    atacInfo: {results: ClInfoModel[], total: number};
    atacInfoLoading: boolean;
    atacInfoInitialized: boolean;

    dnaseInfo: {results: ClInfoModel[], total: number};
    dnaseInfoLoading: boolean;
    dnaseInfoInitialized: boolean;

    faireInfo: {results: ClInfoModel[], total: number};
    faireInfoLoading: boolean;
    faireInfoInitialized: boolean;

    snps: {
        [snpId: string]: {
            loading: boolean,
            snpData?: SnpInfoModel,
            fdr?: string,
            es?: string
        },
    };
}

export const selectTotalInfo = (state: DataState) => state.totalInfo;
export const selectTotalInfoLoading = (state: DataState) => state.totalInfoLoading;

export const selectAtacInfo = (state: DataState) => state.atacInfo;
export const selectAtacInfoLoading = (state: DataState) => state.atacInfoLoading;
export const selectAtacInfoInitialized = (state: DataState) => state.atacInfoInitialized;

export const selectDnaseInfo = (state: DataState) => state.dnaseInfo;
export const selectDnaseInfoLoading = (state: DataState) => state.dnaseInfoLoading;
export const selectDnaseInfoInitialized = (state: DataState) => state.dnaseInfoInitialized;

export const selectFaireInfo = (state: DataState) => state.faireInfo;
export const selectFaireInfoLoading = (state: DataState) => state.faireInfoLoading;
export const selectFaireInfoInitialized = (state: DataState) => state.faireInfoInitialized;

export const selectSnps = (state: DataState) => state.snps;


export const initialState: DataState = {
    totalInfo: null,
    atacInfo: {results: [], total: 0},
    dnaseInfo: {results: [], total: 0},
    faireInfo: {results: [], total: 0},

    totalInfoLoading: false,
    atacInfoLoading: false,
    dnaseInfoLoading: false,
    faireInfoLoading: false,

    atacInfoInitialized: false,
    dnaseInfoInitialized: false,
    faireInfoInitialized: false,
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

        case fromActions.ActionTypes.LoadDnaseInfoSuccess: {
            return {
                ...state,
                dnaseInfoLoading: false,
                dnaseInfoInitialized: true,
                dnaseInfo: {
                    total: action.payload.total,
                    results: action.payload.results.map(convertClInfoBackendModelToClInfoModel)
                }
            };
        }

        case fromActions.ActionTypes.LoadDnaseInfoFail: {
            return {
                ...state,
                dnaseInfoLoading: false
            };
        }

        case fromActions.ActionTypes.LoadDnaseInfo: {
            return {
                ...state,
                dnaseInfoLoading: true
            };
        }

        case fromActions.ActionTypes.LoadFaireInfo: {
            return {
                ...state,
                faireInfoLoading: true
            };
        }

        case fromActions.ActionTypes.LoadFaireInfoSuccess: {
            return {
                ...state,
                faireInfoLoading: false,
                faireInfoInitialized: true,
                faireInfo: {
                    total: action.payload.total,
                    results: action.payload.results.map(convertClInfoBackendModelToClInfoModel)
                }
            };
        }

        case fromActions.ActionTypes.LoadFaireInfoFail: {
            return {
                ...state,
                faireInfoLoading: false
            };
        }

        case fromActions.ActionTypes.LoadAtacInfo: {
            return {
                ...state,
                atacInfoLoading: true
            };
        }

        case fromActions.ActionTypes.LoadAtacInfoSuccess: {
            return {
                ...state,
                atacInfoLoading: false,
                atacInfoInitialized: true,
                atacInfo: {
                    total: action.payload.total,
                    results: action.payload.results.map(convertClInfoBackendModelToClInfoModel)
                }
            };
        }

        case fromActions.ActionTypes.LoadAtacInfoFail: {
            return {
                ...state,
                atacInfoLoading: false
            };
        }


        case fromActions.ActionTypes.LoadSnpInfo: {
            const snpId = `${action.payload.rsId}${action.payload.alt}`;
            return {
                ...state,
                snps: {
                    ...state.snps,
                    [snpId]: {
                        loading: true,
                        fdr: action.payload.fdr,
                        es: action.payload.es
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
                total: 0
            };
            const snpId = `rs${action.payload.info.rs_id}${action.payload.info.alt}`;
            Object.keys(newPhenotypes).forEach(
                s => s !== "total" ?
                    newPhenotypes[s] = reduceToDb(s, action.payload.info.phenotypes) :
                    newPhenotypes.total = action.payload.info.phenotypes.length
            );
            return {
                ...state,
                snps: {
                    ...state.snps,
                    [snpId]: {
                        ...state.snps[snpId],
                        snpData: {
                            ...convertSnpInfoBackendModelToSnpInfoModel(
                                action.payload.info,
                                action.payload.fdr,
                                action.payload.es
                            ),
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
