import { ActionType } from "../../types/Action";
import { RChatState } from "../../types/RChatState";
import { ReduxActionKeys } from "../Types";

const initialState: RChatState = {
    rooms: [],
    gymRooms: [],
    roomId: ''
};

export const ChatReducer = (state = initialState, action: ActionType): RChatState => {
    switch (action.type) {

        case ReduxActionKeys.Logout:
            return {
                ...initialState,
            };

        case ReduxActionKeys.Rooms:
            return {
                ...state,
                rooms: action.payload,
            };

        case ReduxActionKeys.GymRooms:
            return {
                ...state,
                gymRooms: action.payload,
            };

        case ReduxActionKeys.ChatRoomId:
            return {
                ...state,
                roomId: action.payload,
            };

        case ReduxActionKeys.AddSubChat:
            return {
                ...state,
                gymRooms: state.gymRooms.map(room => 
                    room.ID === action.payload.gymRoomId
                        ? {
                            ...room,
                            SubChats: [...(room.SubChats || []), action.payload.subChat]
                        }
                        : room
                )
            };

        case ReduxActionKeys.RemoveSubChat:
            return {
                ...state,
                gymRooms: state.gymRooms.map(room => 
                    room.ID === action.payload.gymRoomId
                        ? {
                            ...room,
                            SubChats: (room.SubChats || []).filter(
                                chat => chat.ID !== action.payload.subChatId
                            )
                        }
                        : room
                )
            };    

        default:
            return state;
    }
}



