import { ActionType } from "../../types/Action";
import { ReduxActionKeys } from "../Types";

const initialState = {
    isWorkoutActive: false,
    workoutSheetRef: null,
    workoutExercises: null,
    workoutStartTime: null, 
    elapsedTime: 0          
};

export const WorkoutReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case ReduxActionKeys.Logout:
            return {
                ...state,
            };
        case ReduxActionKeys.WorkoutActive:
            return {
                ...state,
                isWorkoutActive: action.payload
            };
        case ReduxActionKeys.WorkoutSheetRef:
            return {
                ...state,
                workoutSheetRef: action.payload
            };
        case ReduxActionKeys.WorkoutUpdated:
            return {
                ...state,
                lastUpdate: action.payload
            };
        case ReduxActionKeys.WorkoutExercises:
            return {
                ...state,
                workoutExercises: action.payload
            };
        case ReduxActionKeys.WorkoutStartTime:
            return {
                ...state,
                workoutStartTime: action.payload
            };
        case ReduxActionKeys.WorkoutElapsedTime:
            return {
                ...state,
                elapsedTime: action.payload
            };
        case ReduxActionKeys.WorkoutTimerReset:
            return {
                ...state,
                workoutStartTime: null,
                elapsedTime: 0
            };
        default:
            return state;
    }
};
