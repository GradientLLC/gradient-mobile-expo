

import { ActionType } from "../../types/Action";
import { RPostState } from "../../types/RPostState";
import { ReduxActionKeys } from "../Types";

const initialState: RPostState = {
    post: null,
    posts: [],
    comments: [],
    isCamerRoll: false,
    isShownReport: 0
};

export const PostReducer = (state = initialState, action: ActionType): RPostState => {
    switch (action.type) {

        case ReduxActionKeys.Logout:
            return {
                ...initialState,
            };

        case ReduxActionKeys.CamerRoll:
            return {
                ...state,
                isCamerRoll: action.payload,
            };

        case ReduxActionKeys.Comments:
            return {
                ...state,
                comments: action.payload,
            };

        case ReduxActionKeys.Post:
            return {
                ...state,
                post: action.payload,
            };

        case ReduxActionKeys.AllPosts:
            return {
                ...state,
                posts: action.payload,
            };
        case ReduxActionKeys.Report_Modal:
            return {
                ...state,
                isShownReport: action.payload,
            };

        default:
            return state;
    }
}



