import { LiftingSet, WorkoutInfo } from "../models/LiftingModels";
import { PersonalRecord, workoutLogDetails } from '../interfaces/IUser';
import { IWorkoutSet } from '../interfaces/IWorkout';
import { UseWorkoutPropsAdd } from '../interfaces/IWorkout';

export const getMaxLift = ({ lbs, reps }: LiftingSet): number => {
    // Using the Epley formula for determining a rough max calculation
    const repLimit: Number = Number(reps) > 5 ? 5: Number(reps);
    return Math.floor(Number(lbs) / (1.0278 - (0.0278 * Number(repLimit))));
};

export const getTotalWeightLifted = (sets: LiftingSet[]): number => {
    return sets.reduce((total, set) => total + (Number(set.lbs) * Number(set.reps)), 0);
};

export const getTotalVolume = (workouts: WorkoutInfo[]): number => {
    return workouts.reduce((total, workout) => {
        return total + getTotalWeightLifted(workout.sets);
    }, 0);
};

interface PRUpdateResult {
    updatedRecords: Record<string, PersonalRecord>;
    newPRCount: number;
    bestLift: string;
}

const getPersonalRecords = (
    existingLog: workoutLogDetails,
    workoutSets: IWorkoutSet[]
): PRUpdateResult => {
    const result: PRUpdateResult = {
        updatedRecords: existingLog.workoutPersonalRecords || {},
        newPRCount: 0,
        bestLift: ''
    };
    
    let highestIncreasePercentage = 0;

    workoutSets.forEach(set => {
        const maxLift = set.estimatedMax;
        const exerciseName = set.workoutName;
        

        const existingRecord = result.updatedRecords[exerciseName];
        
        if (!existingRecord) {
            // Create new PR record
            result.updatedRecords[exerciseName] = {
                exerciseName,
                id: set.workoutIdNumber,
                maxLift,
                exerciseType: set.workoutDatum ? set.workoutDatum : 'traditional'
            };
            result.newPRCount++;
            
            // Calculate percentage increase (100% for new records)
            const increasePercentage = 100;
            if (increasePercentage > highestIncreasePercentage) {
                highestIncreasePercentage = increasePercentage;
                result.bestLift = exerciseName;
            }
        } else if (maxLift > existingRecord.maxLift) {
            // Calculate percentage increase
            const increasePercentage = ((maxLift - existingRecord.maxLift) / existingRecord.maxLift) * 100;
            
            // Update existing record
            result.updatedRecords[exerciseName] = {
                ...existingRecord,
                maxLift,
                time: new Date().toISOString()
            };
            result.newPRCount++;
            
            // Track best lift based on highest percentage increase
            if (increasePercentage > highestIncreasePercentage) {
                highestIncreasePercentage = increasePercentage;
                result.bestLift = exerciseName;
            }
        }
    });

    return result;
};

const getPersonalRecordCount = (
    existingLog: workoutLogDetails, 
    workoutAddData: UseWorkoutPropsAdd
): PRUpdateResult => {
    return getPersonalRecords(existingLog, workoutAddData.sets);
};

export { getPersonalRecords, getPersonalRecordCount };
    export type { PRUpdateResult };



