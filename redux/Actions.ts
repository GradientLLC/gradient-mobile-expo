import { ActionType } from "../types/Action"
import { ReduxActionKeys } from "./Types"

// These actions (functions) are used in the dispatch calls
const setLoading = (payload: any): ActionType => ({
    type: ReduxActionKeys.Loading,
    payload:payload
})

const setCameraRoll = (payload: any): ActionType => ({
    type: ReduxActionKeys.CamerRoll,
    payload:payload
})

const onLogout = (payload: any): ActionType => ({
    type: ReduxActionKeys.Logout,
    payload:payload
})


const UserDetails = (payload: any): ActionType => ({
    type: ReduxActionKeys.UserDetail,
    payload:payload
})

const OtherUserDetails = (payload: any): ActionType => ({
    type: ReduxActionKeys.OtherUserDetail,
    payload:payload
})

const UserCredentials = (payload: any): ActionType => ({
    type: ReduxActionKeys.UserCredentials,
    payload:payload
});

const AppVersion = (payload: any): ActionType => ({
    type: ReduxActionKeys.AppVersion,
    payload:payload
})


const RememberMe = (payload: any): ActionType => ({
    type: ReduxActionKeys.RememberMe,
    payload:payload
})

const setNoInternet = (payload: any): ActionType => ({
    type: ReduxActionKeys.NoInternet,
    payload:payload
})

const AllPosts = (payload: any): ActionType => ({
    type: ReduxActionKeys.AllPosts,
    payload:payload
})

const UserPosts = (payload: any): ActionType => ({
    type: ReduxActionKeys.UserPosts,
    payload:payload
})

const UserFavorites = (payload: any): ActionType => ({
    type: ReduxActionKeys.UserFavorites,
    payload:payload
})

const SinglePost = (payload: any): ActionType => ({
    type: ReduxActionKeys.Post,
    payload:payload
})

const ActiveVideo = (payload: any): ActionType => ({
    type: ReduxActionKeys.ActiveVideo,
    payload:payload
})

const Followers = (payload: any): ActionType => ({
    type: ReduxActionKeys.Followers,
    payload:payload
})

const Following = (payload: any): ActionType => ({
    type: ReduxActionKeys.Following,
    payload:payload
})

const ChatRoomId = (payload: any): ActionType => ({
    type: ReduxActionKeys.ChatRoomId,
    payload
})
const Rooms = (payload: any): ActionType => ({
    type: ReduxActionKeys.Rooms,
    payload:payload
})

const GymRooms = (payload: any): ActionType => ({
    type: ReduxActionKeys.GymRooms,
    payload:payload
})

const UnRead = (payload: any): ActionType => ({
    type: ReduxActionKeys.UnRead,
    payload:payload
})

const Stories = (payload: any): ActionType => ({
    type: ReduxActionKeys.Stories,
    payload:payload
})

const Comments = (payload: any): ActionType => ({
    type: ReduxActionKeys.Comments,
    payload:payload
})

const MediaLibrary = (payload: any): ActionType => ({
    type: ReduxActionKeys.Media_Library,
    payload:payload
})

const SelectedMedia = (payload: any): ActionType => ({
    type: ReduxActionKeys.Selected_Media,
    payload:payload
})

const SearchUser = (payload: any): ActionType => ({
    type: ReduxActionKeys.Searched_User,
    payload:payload
})

const SearchPost = (payload: any): ActionType => ({
    type: ReduxActionKeys.Searched_Post,
    payload:payload
})

const ReportModal = (payload: any): ActionType => ({
    type: ReduxActionKeys.Report_Modal,
    payload:payload
})

const setFCM = (payload: any): ActionType => ({
    type: ReduxActionKeys.FCM,
    payload:payload
})

const setWorkoutActive = (payload: boolean): ActionType => ({
    type: ReduxActionKeys.WorkoutActive,
    payload
});

const setWorkoutSheetRef = (payload: any): ActionType => ({
    type: ReduxActionKeys.WorkoutSheetRef,
    payload
});

const setWorkoutUpdate = (payload: any): ActionType => ({
    type: ReduxActionKeys.WorkoutUpdated,
    payload
});

const addSubChat = (gymRoomId: string, subChat: any): ActionType => ({
    type: ReduxActionKeys.AddSubChat,
    payload: { gymRoomId, subChat }
});

const removeSubChat = (gymRoomId: string, subChatId: string): ActionType => ({
    type: ReduxActionKeys.RemoveSubChat,
    payload: { gymRoomId, subChatId }
});

const setWorkoutExercises = (payload: any): ActionType => ({
    type: ReduxActionKeys.WorkoutExercises,
    payload
});

const setWorkoutStartTime = (startTime: number | null) => ({
    type: ReduxActionKeys.WorkoutStartTime,
    payload: startTime
});

const setWorkoutElapsedTime = (time: number) => ({
    type: ReduxActionKeys.WorkoutElapsedTime,
    payload: time
});

const resetWorkoutTimer = () => ({
    type: ReduxActionKeys.WorkoutTimerReset
});

const updateWorkoutStats = (payload: any): ActionType => ({
    type: ReduxActionKeys.UpdateWorkoutStats,
    payload
});


export {
    setFCM,
    setLoading,
    setCameraRoll,
    UserDetails,
    OtherUserDetails,
    UserCredentials,
    AppVersion,
    RememberMe,
    onLogout,
    setNoInternet,
    AllPosts,
    UserPosts,
    UserFavorites,
    SinglePost,
    ActiveVideo,
    Followers,
    Following,
    ChatRoomId,
    Rooms,
    GymRooms,
    UnRead,
    Stories,
    Comments,
    MediaLibrary,
    SelectedMedia,
    SearchUser,
    SearchPost,
    ReportModal,
    setWorkoutActive,
    setWorkoutSheetRef,
    setWorkoutUpdate,
    setWorkoutExercises,
    addSubChat,
    removeSubChat,
    setWorkoutStartTime,
    setWorkoutElapsedTime,
    resetWorkoutTimer,
    updateWorkoutStats
};
