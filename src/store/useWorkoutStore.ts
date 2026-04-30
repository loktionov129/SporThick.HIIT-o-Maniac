import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Workout } from '../types';

interface WorkoutState {
  workouts: Workout[];
  settings: { 
    soundEnabled: boolean;
    vibrationEnabled: boolean;
  };
  filterQuery: string;
  addWorkout(workout: Workout): void;
  updateWorkout(id: string, workout: Partial<Workout>): void;
  reorderWorkouts(startIndex: number, endIndex: number): void;
  deleteWorkout(id: string): void;
  toggleSound(): void;
  setFilter(query: string): void;
}

const useWorkoutStore = create<WorkoutState>()(persist(
  (set) => ({
    workouts: [],
    settings: { 
      soundEnabled: true,
      vibrationEnabled: false 
    },
    filterQuery: '',

    reorderWorkouts: (startIndex, endIndex) => {
      set((state) => {
        const newWorkouts = [...state.workouts];
        const [removed] = newWorkouts.splice(startIndex, 1);
        newWorkouts.splice(endIndex, 0, removed);
        return { workouts: newWorkouts };
      });
    },

    addWorkout: (workout) => set((state) => ({ 
      workouts: [...state.workouts, { ...workout, rounds: workout.rounds || 1, restDuration: workout.restDuration || 0 }] 
    })),

    updateWorkout: (id, workout) => set((state) => ({
      workouts: state.workouts.map((w) => w.id === id ? { ...w, ...workout } : w),
    })),

    deleteWorkout: (id) => set((state) => ({ 
      workouts: state.workouts.filter((w) => w.id !== id) 
    })),

    toggleSound: () => set((state) => ({ 
      settings: { ...state.settings, soundEnabled: !state.settings.soundEnabled } 
    })),

    setFilter: (query) => set({ filterQuery: query }),
  }),
  {
    name: 'workout_store'
  }
));

export default useWorkoutStore;
