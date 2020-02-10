import {createSelector} from "@ngrx/store";
import * as fromRoot from "../reducer";
import * as fromSearch from "src/app/store/reducer/search.reducer";


export const selectCurrentSearchQuery = createSelector(fromRoot.selectSearch, fromSearch.selectSearchQuery);
