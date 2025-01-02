import { IUser } from "./IUser";

export interface IComment {
    Created: Date | string,
    Id: string | undefined,
    postId: string,
    userId: string | null | undefined,
    msg: string,
    Likes: Array<string>,
    userData?: IUser | null
}

export const DEFAULT_COMMENT = {
    Created: new Date(),
    Id: '',
    postId: '',
    userId: '',
    msg: '',
    Likes: [],
} as IComment;

