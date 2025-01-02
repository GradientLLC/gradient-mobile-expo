import { IUser } from "./IUser";

export interface IWorkout {
    created: Date | string,
    id: string | undefined,
    postId?: string,
    userId: string | null | undefined,
    userData?: IUser | null,
    prs: number,
    bestLift: string,
    volume: number,
    name: string,
    duration: string,
    workoutInfo?: IWorkoutSet[]
}

export const DEFAULT_WORKOUT = {
    created: new Date(),
    id: '',
    postId: '',
    userId: '',
    prs: 0,
    bestLift: '',
    volume: 0,
    name: '',
    workoutInfo: [],
    duration: ''
} as IWorkout;

export interface IWorkoutSet{ 
    workoutIdNumber: string;
    workoutName: string;
    reps: number;
    lbs: number;
    estimatedMax: number;
    isPrimaryStat?: boolean;
    workoutDatum?: WorkoutDatum;
}

export interface UseWorkoutPropsAdd { 
    id?: string
    duration: string
    volume: number
    name: string
    created: Date | string
    sets: IWorkoutSet[]
}

export type WorkoutDatum = 'traditional' | 'repsOnly' | 'time'

