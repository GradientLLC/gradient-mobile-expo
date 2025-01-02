import { RAuthState } from "./RAuthState"
import { RChatState } from "./RChatState"
import { RCommentState } from "./RCommentState"
import { RGalleryState } from "./RGalleryState"
import { RPostState } from "./RPostState"
import { RSearchState } from "./RSearchState"
import { RStoryState } from "./RStoryState"
import { RUserState } from "./RUserState"
import { RPlatformState } from "./RPlatformState"

export type RState = {
    auth: RAuthState,
    post: RPostState,
    otherUser:RUserState,
    chatRooms:RChatState,
    stories:RStoryState,
    comments:RCommentState,
    gallery:RGalleryState,
    search:RSearchState,
    platform: RPlatformState
    
}