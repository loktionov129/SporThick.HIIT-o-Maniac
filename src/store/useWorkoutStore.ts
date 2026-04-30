import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Workout, WorkoutHistoryEntry } from '../types';

interface WorkoutState {
  workouts: Workout[];
  history: WorkoutHistoryEntry[];
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
  addHistoryEntry: (entry: WorkoutHistoryEntry) => void;
  clearHistory: () => void;
  deleteHistoryEntry: (id: string) => void;
  importData: (data: { workouts: Workout[], history: WorkoutHistoryEntry[] }) => void;
  resetAll: () => void;
}

const useWorkoutStore = create<WorkoutState>()(persist(
  (set) => ({
    workouts: [],
    history: [],
    addHistoryEntry: (entry) => set((state) => ({ 
      history: [entry, ...state.history]
    })),
    clearHistory: () => set({ history: [] }),
    deleteHistoryEntry: (id) => set((state) => ({
      history: state.history.filter((entry) => entry.id !== id)
    })),
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
    importData: (data) => set({ 
      workouts: data.workouts || [], 
      history: data.history || [] 
    }),
    resetAll: () => {
      if (confirm('ВНИМАНИЕ! Это удалит ВСЕ твои тренировки и всю историю без возможности восстановления. Вы уверены?')) {
        set({ workouts: [], history: [] });
        alert('Все данные стерты. Начинаем с чистого листа! 🚀');
      }
    },
  }),
  {
    name: 'workout_store'
  }
));

export default useWorkoutStore;
