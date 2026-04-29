import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Workout } from '../types';

interface WorkoutState {
  workouts: Workout[];
  settings: { soundEnabled: boolean };
  filterQuery: string;
  currentExerciseIndex?: number;
  addWorkout(workout: Workout): void;
  updateWorkout(id: string, workout: Partial<Workout>): void;
  reorderWorkouts(startIndex: number, endIndex: number): void;
  deleteWorkout(id: string): void;
  toggleSound(): void;
  setFilter(query: string): void;
  setCurrentExerciseIndex(index?: number): void;
}

const useWorkoutStore = create<WorkoutState>()(persist(
  (set, _) => ({
  workouts: [],
  settings: { soundEnabled: true },
  filterQuery: '',
  currentExerciseIndex: undefined,
  reorderWorkouts: (startIndex: number, endIndex: number) => {
    set((state) => {
      const newWorkouts = Array.from(state.workouts);
      const [removed] = newWorkouts.splice(startIndex, 1);
      newWorkouts.splice(endIndex, 0, removed);
      return { workouts: newWorkouts };
    });
  },
  addWorkout: (workout) => set((state) => ({ workouts: [...state.workouts, workout] })),
  updateWorkout: (id, workout) => set((state) => ({
    workouts: state.workouts.map((w) => w.id === id ? { ...w, ...workout } : w),
  })),
  deleteWorkout: (id) => set((state) => ({ workouts: state.workouts.filter((w) => w.id !== id) })),
  toggleSound: () => set((state) => ({ settings: { soundEnabled: !state.settings.soundEnabled } })),
  setFilter: (query) => set({ filterQuery: query }),
  setCurrentExerciseIndex: (index) => set({ currentExerciseIndex: index }),
  }),
  {
    name: 'workout_store'
  }
));

export default useWorkoutStore;