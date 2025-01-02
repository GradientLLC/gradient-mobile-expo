import { ActionType } from "../../types/Action";
import { RSearchState } from "../../types/RSearchState";
import { ReduxActionKeys } from "../Types";

const initialState: RSearchState = {
    users: [],
    posts: []
};

export const SearchReducer = (state = initialState, action: ActionType): RSearchState => {
    switch (action.type) {

        case ReduxActionKeys.Logout:
            return {
                ...initialState,
            };

        case ReduxActionKeys.Searched_User:
            return {
                ...state,
                users: action.payload,
            };

        case ReduxActionKeys.Searched_Post:
            return {
                ...state,
                posts: action.payload,
            };

        default:
            return state;
    }
}

