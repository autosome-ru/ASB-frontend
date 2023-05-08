import {createSelector} from "@ngrx/store";
import * as fromRoot from "../../reducer/adastra";
import * as fromData from "src/app/store/reducer/adastra/data.reducer";

export const selectTotalInfo = createSelector(fromRoot.selectData, fromData.selectTotalInfo);
export const selectTotalInfoLoading = createSelector(fromRoot.selectData, fromData.selectTotalInfoLoading);

export const selectAtacInfo = createSelector(fromRoot.selectData, fromData.selectAtacInfo);
export const selectAtacInfoLoading = createSelector(fromRoot.selectData, fromData.selectAtacInfoLoading);
export const selectAtacInfoInitialized = createSelector(fromRoot.selectData, fromData.selectAtacInfoInitialized);

export const selectDnaseInfo = createSelector(fromRoot.selectData, fromData.selectDnaseInfo);
export const selectDnaseInfoLoading = createSelector(fromRoot.selectData, fromData.selectDnaseInfoLoading);
export const selectDnaseInfoInitialized = createSelector(fromRoot.selectData, fromData.selectDnaseInfoInitialized);

export const selectFaireInfo = createSelector(fromRoot.selectData, fromData.selectFaireInfo);
export const selectFaireInfoLoading = createSelector(fromRoot.selectData, fromData.selectFaireInfoLoading);
export const selectFaireInfoInitialized = createSelector(fromRoot.selectData, fromData.selectFaireInfoInitialized);


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
