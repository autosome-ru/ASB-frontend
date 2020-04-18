import {createSelector} from "@ngrx/store";
import * as fromRoot from "../reducer";
import * as fromData from "src/app/store/reducer/data.reducer";
import {SnpInfoModel} from "../../models/data.model";

export const selectTotalInfo = createSelector(fromRoot.selectData, fromData.selectTotalInfo);
export const selectTotalInfoLoading = createSelector(fromRoot.selectData, fromData.selectTotalInfoLoading);


const _selectSnpInfoData = createSelector(fromRoot.selectData, fromData.selectSnps);
const _selectSnpsDataById = createSelector(_selectSnpInfoData,
    (snps: {
                [snpId: number]: {
                    snpData?: SnpInfoModel,
                    loading: boolean,
                };
            }, id: string) => <{loading: boolean, snpData?: SnpInfoModel}> snps[id],
);
export const selectSnpInfoDataById = createSelector(
    _selectSnpsDataById,
    snp => snp && snp.snpData,
);
export const selectSnpInfoDataLoadingById = createSelector(
    _selectSnpsDataById,
    snp => snp && snp.loading,
);
