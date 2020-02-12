import {createSelector} from "@ngrx/store";
import * as fromRoot from "../reducer";
import * as fromSearch from "src/app/store/reducer/search.reducer";


export const selectCurrentSearchQuery = createSelector(fromRoot.selectSearch, fromSearch.selectSearchQuery);
export const selectCurrentSearchOptions = createSelector(fromRoot.selectSearch, fromSearch.selectSearchOptions);
export const selectCurrentSearchOptionsLoading = createSelector(fromRoot.selectSearch,
    fromSearch.selectSearchOptionsLoading);
export const selectCurrentSearchResults = createSelector(fromRoot.selectSearch, fromSearch.selectSearchResults);
export const selectCurrentSearchResultsLoading = createSelector(fromRoot.selectSearch,
    fromSearch.selectSearchResultsLoading);
