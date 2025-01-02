import { combineReducers } from 'redux';
import { AuthReducer } from './Reducers/Auth';
import { PostReducer } from './Reducers/Post';
import { OtherUserReducer } from './Reducers/OtherUser';
import { ChatReducer } from './Reducers/Chat';
import { StoryReducer } from './Reducers/Story';
import { GalleryReducer } from './Reducers/Gallery';
import { SearchReducer } from './Reducers/Search';
import { PlatformReducer } from './Reducers/Platform';
import { WorkoutReducer } from './Reducers/Workout';

// This combineReducer automatically delegates 
// which reducer is called based  on the 'type' of action
export default combineReducers({
    auth: AuthReducer,
    post: PostReducer,
    otherUser: OtherUserReducer,
    chatRooms: ChatReducer,
    stories: StoryReducer,
    gallery: GalleryReducer,
    search: SearchReducer,
    platform:PlatformReducer,
    workout: WorkoutReducer
});
