import { RRelationshipOptions } from "../types/RUser";
import { IPost } from "./IPost";
import { WorkoutDatum } from "./IWorkout";

interface Gym {
    Created: Date;
    placeId: string;
    userId: string;
    title: string;
    address: string;
    lat: string;
    long: string
}

export type ExerciseName = string;

export interface PersonalRecord {
    exerciseName: ExerciseName,
    id: string,
    maxLift: number,
    exerciseType: WorkoutDatum
    time?: Date | string
}

export interface workoutLogDetails {
    workoutsCompleted: number,
    totalVolumeCompleted: number,
    workoutIds: Record<string, string>, 
    workoutPersonalRecords?: Record<ExerciseName, PersonalRecord> 
}

export interface ITemplate {
    id: string;
    title: string;
    created: Date | string;
    userId: string;
    liftingInfo: {
        title: string;
        info: Array<{
            lbs: string;
            reps: string;
        }>;
    }[];
}

export interface ITemplateWUserData extends ITemplate {
    name?: string, 
    userName?: string
}


export interface IUser {
    Created?: Date;
    userInfo: {
        workoutStats?: any;
        isFriend?: boolean;
        userId: string | undefined;
        userName: string | undefined;
        name: string | undefined;
        email: string | undefined;
        emailVerified: boolean;
        phoneNumber: string | undefined;
        profilePhoto?: string | null | undefined;
        coverPhoto: string | undefined;
        about: string | undefined;
        fcm: string | null,
        isAccountDel?: boolean,
        reportedBy: Array<string>,
        isReported: number,
        followers: Array<string>,
        following: Array<string>,
        blockedBy: Array<string>,
        blockedTo: Array<string>,
        gyms: Array<Gym>,
        posts?: Array<IPost>,
        favorites?: Array<IPost>,
        saves?: Array<IPost>,
        relationStatus: RRelationshipOptions | undefined,
        seenStories: [], //add story IDs
        isGymOwner: boolean,
        tokens: number,
        isPrivate: boolean,
        workoutLogDetails?: workoutLogDetails,
        workoutTemplates?: Record<string, ITemplate>
        isGradientAdmin?: boolean
    }
}

export const DEFAULT_USER = {
    Created: new Date(),
    userInfo: {
        userId: '',
        userName: '',
        name: '',
        email: '',
        emailVerified: false,
        phoneNumber: '',
        profilePhoto: '',
        coverPhoto: '',
        about: '',
        fcm: '',
        isAccountDel: false,
        reportedBy: [],
        isReported: 0,
        followers: [],
        following: [],
        blockedBy: [],
        blockedTo: [],
        gyms: [],
        posts: [],
        favorites: [],
        saves: [],
        relationStatus: 'single',
        seenStories: [],
        isGymOwner: false,
        tokens: 3,
        isPrivate: false,
        isGradientAdmin: false
    }
} as IUser;

export type userRole = 'Admin' | 'GymOwner' | 'GradientAdmin' | 'Trainer' | 'Member'
