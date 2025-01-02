import { IPost } from "../interfaces/IPost"
import { IUser } from "../interfaces/IUser"

export type RSearchState = {
    users: [] | Array<IUser>,
    posts: [] | Array<IPost>,
}