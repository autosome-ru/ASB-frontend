import {createSelector} from "@ngrx/store";
import * as fromRoot from "../reducer";
import * as fromRelease from "src/app/store/reducer/releases.reducer";

export const selectCurrentRelease = createSelector(fromRoot.selectRelease, fromRelease.selectCurrentRelease);

