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