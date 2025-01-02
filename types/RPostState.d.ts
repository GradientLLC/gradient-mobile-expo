import { IComment } from "../interfaces/IComment"
import { IPost } from "../interfaces/IPost"

export type RPostState = {
    post: null | IPost,
    posts: null | Array<IPost>,
    comments: null | Array<IComment>,
    isCamerRoll: boolean
    isShownReport: 0
}