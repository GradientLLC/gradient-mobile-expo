import { IUser } from "./IUser";

export interface ISingleStory {
    Created: Date,
    ID: string,
    URL: string,
    type: string,
    duration: number,
}

export const DEFAULT_SINGLE_STORY = {
    Created: new Date(),
    ID: '',
    URL: '',
    type: '',
    duration: 0
} as ISingleStory

export interface IUserStory {
    Created: Date,
    LastCreated: Date,
    userId: string | undefined,
    stories: Array<ISingleStory>,
    userData?: IUser
}

export const DEFAULT_USER_STORY = {
    Created: new Date(),
    LastCreated: new Date(),
    userId: '',
    stories: [],
} as IUserStory;
