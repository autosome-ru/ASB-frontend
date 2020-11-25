import {createSelector} from "@ngrx/store";
import * as fromRoot from "../../reducer/adastra";
import * as fromRelease from "src/app/store/reducer/adastra/releases.reducer";

export const selectCurrentRelease = createSelector(fromRoot.selectRelease, fromRelease.selectCurrentRelease);
