import { DEFAULT_USER, IUser } from "./IUser";
import { IWorkout } from "./IWorkout";

export interface IPost {
    Created: Date | string | undefined,
    time?: string,
    Id?: string,
    userId: string | null | undefined,
    media?: string,
    thumbnail: string,
    type: string,
    title: string,
    description: string,
    favorites: Array<string>,
    shares: Array<string>,
    saves: Array<string>,
    comments: number,
    isDeleted: boolean,
    reportedBy: Array<string>,
    isReported: number,
    userData?: IUser,
    postType?: 'traditional' | 'workoutLog',
    workoutContent?: IWorkout
}

export const DEFAULT_POST = {
    Created: new Date() || '',
    time: '',
    Id: '',
    userId: '',
    media: '',
    thumbnail: '',
    type: '',
    title: '',
    description: '',
    favorites: [],
    shares: [],
    saves: [],
    comments: 0,
    isDeleted: false,
    reportedBy: [],
    isReported: 0,
    userData: DEFAULT_USER,
    postType: 'traditional'
} as IPost;
