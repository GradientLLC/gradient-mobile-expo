import { IWorkout } from "../interfaces/IWorkout";

export const CalculateStreak = (workouts: IWorkout[]) => {
    if (!workouts.length) return 0;    
    const sortedWorkouts = [...workouts].sort((a, b) => 
        new Date(b.created).getTime() - new Date(a.created).getTime()
    );
    let currentStreak = 0;
    let currentWeekWorkouts = 0;
    let currentWeekStart = new Date();
    currentWeekStart.setHours(0, 0, 0, 0);
    currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay());
    for (const workout of sortedWorkouts) {
        const workoutDate = new Date(workout.created);
        workoutDate.setHours(0, 0, 0, 0);

        if (workoutDate < currentWeekStart) {
            if (currentWeekWorkouts >= 2) {
                currentStreak++;
                // Move to previous week
                currentWeekStart.setDate(currentWeekStart.getDate() - 7);
                currentWeekWorkouts = 0;
            } else {
                break;
            }
        }

        if (workoutDate >= currentWeekStart) {
            currentWeekWorkouts++;
        }
    }
    if (currentWeekWorkouts >= 2) {
        currentStreak++;
    }
    return currentStreak;
};