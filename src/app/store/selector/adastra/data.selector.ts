import {createSelector} from "@ngrx/store";
import * as fromRoot from "../../reducer/adastra";
import * as fromData from "src/app/store/reducer/adastra/data.reducer";
import {SnpInfoModel} from "../../../models/data.model";

export const selectTotalInfo = createSelector(fromRoot.selectData, fromData.selectTotalInfo);
export const selectTotalInfoLoading = createSelector(fromRoot.selectData, fromData.selectTotalInfoLoading);

export const selectTfInfo = createSelector(fromRoot.selectData, fromData.selectTfInfo);
export const selectTfInfoLoading = createSelector(fromRoot.selectData, fromData.selectTfInfoLoading);
export const selectTfInfoInitialized = createSelector(fromRoot.selectData, fromData.selectTfInfoInitialized);

export const selectClInfo = createSelector(fromRoot.selectData, fromData.selectClInfo);
export const selectClInfoLoading = createSelector(fromRoot.selectData, fromData.selectClInfoLoading);
export const selectClInfoInitialized = createSelector(fromRoot.selectData, fromData.selectClInfoInitialized);


const _selectSnpInfoData = createSelector(fromRoot.selectData, fromData.selectSnps);
const _selectSnpsDataById = createSelector(_selectSnpInfoData,
    (snps: {
                [snpId: number]: {
                    snpData?: SnpInfoModel,
                    loading: boolean,
                    fdr: string
                };
            }, id: string) => snps[id] as {loading: boolean, fdr: string, snpData?: SnpInfoModel},
);
export const selectSnpInfoDataById = createSelector(
    _selectSnpsDataById,
    snp => snp && snp.snpData,
);
export const selectSnpInfoFdrById = createSelector(
    _selectSnpsDataById,
    snp => snp && snp.fdr,
);
export const selectSnpInfoDataLoadingById = createSelector(
    _selectSnpsDataById,
    snp => snp && snp.loading,
);
