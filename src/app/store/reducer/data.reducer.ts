import * as fromActions from "src/app/store/action/data.action";
import {SnpInfoModel} from "src/app/models/data.model";
import {convertSnpInfoBackendModelToSnpInfoModel} from "../../helpers/snp-model.converter";

export interface DataState {
    snpData: SnpInfoModel,
    snpDataLoading: boolean
}
export const selectSnpData = (state: DataState) => state.snpData;
export const selectSnpDataLoading = (state: DataState) => state.snpDataLoading;

export const initialState: DataState = {
    snpDataLoading: true,
    snpData: {
        rsId: null,
        cellLines: [],
        pos: null,
        chr: null,
        transFactors: [],
        refBase: null,
        altBase: null
    }
};
export function dataReducer(state: DataState = initialState, action: fromActions.ActionUnion): DataState {
    switch (action.type) {
        case fromActions.ActionTypes.LoadSnpInfo: {
            return {
                ...state,
                snpDataLoading: true,
            };
        }
        case fromActions.ActionTypes.LoadSnpInfoSuccess: {
            return {
                ...state,
                snpData: convertSnpInfoBackendModelToSnpInfoModel(action.payload),
                snpDataLoading: false,
            };
        }
        case fromActions.ActionTypes.LoadSnpInfoFail: {
            return {
                ...state,
                snpDataLoading: false,
            };
        }
        default: {
            return state;
        }
    }
}
