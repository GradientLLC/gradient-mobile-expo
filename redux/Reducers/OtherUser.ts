

import { ActionType } from "../../types/Action";
import { RUserState } from "../../types/RUserState";
import { ReduxActionKeys } from "../Types";

const initialState: RUserState = {
    otherUserDetails: null
};

export const OtherUserReducer = (state = initialState, action: ActionType): RUserState => {
    switch (action.type) {

        case ReduxActionKeys.Logout:
            return {
                ...initialState,
            };
            
        case ReduxActionKeys.OtherUserDetail:
            return {
                ...state,
                otherUserDetails: action.payload,
            };

        default:
            return state;
    }
}



