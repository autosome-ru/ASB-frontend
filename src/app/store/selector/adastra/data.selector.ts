import {createSelector} from "@ngrx/store";
import * as fromRoot from "../../reducer/adastra";
import * as fromData from "src/app/store/reducer/adastra/data.reducer";

export const selectTotalInfo = createSelector(fromRoot.selectData, fromData.selectTotalInfo);
export const selectTotalInfoLoading = createSelector(fromRoot.selectData, fromData.selectTotalInfoLoading);

export const selectTfInfo = createSelector(fromRoot.selectData, fromData.selectTfInfo);
export const selectTfInfoLoading = createSelector(fromRoot.selectData, fromData.selectTfInfoLoading);
export const selectTfInfoInitialized = createSelector(fromRoot.selectData, fromData.selectTfInfoInitialized);

export const selectClInfo = createSelector(fromRoot.selectData, fromData.selectClInfo);
export const selectClInfoLoading = createSelector(fromRoot.selectData, fromData.selectClInfoLoading);
export const selectClInfoInitialized = createSelector(fromRoot.selectData, fromData.selectClInfoInitialized);


const _selectSnpInfoData = createSelector(fromRoot.selectData, fromData.selectSnps);
const _selectSnpsDataById = (id: string) => createSelector(_selectSnpInfoData,
    (snps) => snps[id],
);
export const selectSnpInfoDataById = (id: string) => createSelector(
    _selectSnpsDataById(id),
    snp => snp && snp.snpData,
);
export const selectSnpInfoFdrById = (id: string) => createSelector(
    _selectSnpsDataById(id),
    snp => snp && snp.fdr,
);
export const selectSnpInfoEsById = (id: string) => createSelector(
    _selectSnpsDataById(id),
    snp => snp && snp.es,
);
export const selectSnpInfoDataLoadingById = (id: string) => createSelector(
    _selectSnpsDataById(id),
    snp => snp && snp.loading,
);
