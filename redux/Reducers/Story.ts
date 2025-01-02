

import { ActionType } from "../../types/Action";
import { RStoryState } from "../../types/RStoryState";
import { ReduxActionKeys } from "../Types";

const initialState: RStoryState = {
    stories:  []
};

export const StoryReducer = (state = initialState, action: ActionType): RStoryState => {
    switch (action.type) {

        case ReduxActionKeys.Logout:
            return {
                ...initialState,
            };
            
        case ReduxActionKeys.Stories:
            return {
                ...state,
                stories: action.payload,
            };

        default:
            return state;
    }
}



