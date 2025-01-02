

import { ActionType } from "../../types/Action";
import { RPostState } from "../../types/RPostState";
import { ReduxActionKeys } from "../Types";

const initialState: RPostState = {
    post: null,
    posts: null,
    comments: null,
    isCamerRoll: false,
    isShownReport: 0
};

export const GymReducer = (state = initialState, action: ActionType): RPostState => {
    switch (action.type) {

        case ReduxActionKeys.Logout:
            return {
                ...initialState,
            };
            
        case ReduxActionKeys.Post:
            return {
                ...state,
                post: action.payload,
            };

        default:
            return state;
    }
}



