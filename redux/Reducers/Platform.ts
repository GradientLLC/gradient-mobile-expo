import { ActionType } from "../../types/Action";
import { RPlatformState } from "../../types/RPlatformState";
import { ReduxActionKeys } from "../Types";

const initialState: RPlatformState = {
    fcm: null
};

export const PlatformReducer = (state = initialState, action: ActionType): RPlatformState => {
    switch (action.type) {

        case ReduxActionKeys.FCM:
            return {
                ...state,
                fcm: action.payload,
            };

        default:
            return state;
    }
}

