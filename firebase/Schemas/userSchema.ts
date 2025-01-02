import { DEFAULT_GYM, IGym } from "../../interfaces/IGym"
import { DEFAULT_POST, IPost } from "../../interfaces/IPost"
import { DEFAULT_SINGLE_STORY, DEFAULT_USER_STORY, ISingleStory, IUserStory } from "../../interfaces/IStory"
import { DEFAULT_USER, IUser } from "../../interfaces/IUser"
import { DEFAULT_COMMENT, IComment } from "../../interfaces/IComment"

export class User {
    UserDetails: IUser

    constructor(user: IUser) {
        if (user) this.UserDetails = user
        else this.UserDetails = DEFAULT_USER
    }
}

export class Post {
    post: IPost

    constructor(post: IPost) {
        if (post) this.post = post
        else this.post = DEFAULT_POST
    }
}

export class Comment {
    comment: IComment

    constructor(comment: IComment) {
        if (comment) this.comment = comment
        else this.comment = DEFAULT_COMMENT
    }
}

export class Gyms {
    gym: IGym

    constructor(gym: IGym) {
        if (gym) this.gym = gym
        else this.gym = DEFAULT_GYM
    }
}

export class UserStory {
    story: IUserStory

    constructor(story: IUserStory) {
        if (story) this.story = story
        else this.story = DEFAULT_USER_STORY
    }
}

export class NewSingleStory {
    story: ISingleStory

    constructor(story: ISingleStory) {
        if (story) this.story = story
        else this.story = DEFAULT_SINGLE_STORY
    }
}