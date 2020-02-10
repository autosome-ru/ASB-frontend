import {createSelector} from "@ngrx/store";
import * as fromRoot from "../reducer";
import * as fromData from "src/app/store/reducer/data.reducer";


export const selectSnpInfoData = createSelector(fromRoot.selectData, fromData.selectSnpData);
export const selectSnpInfoDataLoading = createSelector(fromRoot.selectData, fromData.selectSnpDataLoading);
