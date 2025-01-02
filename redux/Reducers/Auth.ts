import { ActionType } from "../../types/Action";
import { RAuthState } from "../../types/RAuthState";
import { ReduxActionKeys } from "../Types";

const initialState: RAuthState = {
    shouldRemember: false,
    loggedInUserDetails: null,
    followers: null,
    following: null
};

export const AuthReducer = (state = initialState, action: ActionType): RAuthState => {
    switch (action.type) {

        case ReduxActionKeys.Logout:
            return {
                ...initialState,
            };

        case ReduxActionKeys.UserDetail:
            return {
                ...state,
                loggedInUserDetails: action.payload,
            };

        case ReduxActionKeys.Followers:
            return {
                ...state,
                followers: action.payload,
            };

        case ReduxActionKeys.Following:
            return {
                ...state,
                following: action.payload,
            };

        case ReduxActionKeys.UpdateWorkoutStats:
            return {
                ...state,
                loggedInUserDetails: {
                    ...state.loggedInUserDetails,
                    userInfo: {
                        ...state.loggedInUserDetails.userInfo,
                        workoutStats: action.payload
                    }
                }
            };

        default:
            return state;
    }
}

