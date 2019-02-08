import { Subject } from 'rxjs/Subject';
import { Exercise } from './exercise.model';


export class TrainingService {
    exerciseChanged = new Subject<Exercise>();

    private availableExercises: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 3890, calories: 8 },
        { id: 'touch-toes', name: 'Touch toes', duration: 30000, calories: 82 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 6602, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 3330, calories: 82 }
    ];

    private runningExercise: Exercise;
    private exercises: Exercise[] = [];

    getExercises() {
        return this.availableExercises.slice();
    }

    startExercise(selectedId: string) {
        const runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({...this.runningExercise});
    }

    completeExcercise() {
        this.exercises.push({
            ...this.runningExercise,
            date: new Date(),
            state: 'completed'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.exercises.push({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.duration * (progress / 100),
            date: new Date(),
            state: 'cancelled'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    getRunningExercise() {
        return {...this.runningExercise};
    }

    getCompletedExercises() {
        return this.exercises.slice();
    }
}