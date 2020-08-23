import * as fromActions from "src/app/store/action/releases.action";
import {ReleaseModel} from "../../models/releases.model";
import {recentRelease} from "../../helpers/releases";

export interface ReleaseState {
    release: ReleaseModel,
    releaseLoading: boolean
}

export const selectCurrentRelease = (state: ReleaseState) => state.release;

export const initialState: ReleaseState = {
    release: recentRelease,
    releaseLoading: false
};

export function releaseReducer(state: ReleaseState = initialState, action: fromActions.ActionUnion): ReleaseState {
    switch (action.type) {
        case fromActions.ActionTypes.GetCurrentRelease: {
            return {
                ...state,
                releaseLoading: true
            }
        }
        case fromActions.ActionTypes.GetCurrentReleaseFail: {
            return {
                ...state,
                releaseLoading: false
            }
        }
        case fromActions.ActionTypes.GetCurrentReleaseSuccess: {
            return {
                ...state,
                releaseLoading: false,
                release: action.payload
            }
        }

        default: {
            return state;
        }
    }
}

