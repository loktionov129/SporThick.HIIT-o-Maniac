import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Workout, WorkoutHistoryEntry } from '../types';

interface WorkoutState {
  workouts: Workout[];
  history: WorkoutHistoryEntry[];
  settings: { 
    soundEnabled: boolean;
    vibrationEnabled: boolean;
    theme: 'dark' | 'light';
  };
  filterQuery: string;
  actions: {
    addPreset: (preset: Omit<Workout, 'id'>) => void;
    addWorkout: (workout: Workout) => void;
    reorderWorkouts: (startIndex: number, endIndex: number) => void;
    setFilter: (query: string) => void;
    deleteWorkout: (id: string) => void;
    updateWorkout: (id: string, workout: Partial<Workout>) => void;
    toggleSound: () => void;
    toggleTheme: () => void;
    addHistoryEntry: (entry: WorkoutHistoryEntry) => void;
    clearHistory: () => void;
    deleteHistoryEntry: (id: string) => void;
    importData: (data: { workouts: Workout[], history: WorkoutHistoryEntry[] }) => void;
    resetAll: () => void;
  }
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set) => ({
      workouts: [],
      history: [],
      settings: { 
        soundEnabled: true,
        vibrationEnabled: false,
        theme: 'dark',
      },
      filterQuery: '',

      actions: {
        addPreset: (preset) => set((state) => ({
          workouts: [
            ...state.workouts,
            { ...preset, id: `workout-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` }
          ]
        })),
        addWorkout: (workout) => set((state) => ({ 
          workouts: [
            ...state.workouts, 
            { ...workout, rounds: workout.rounds ?? 1, restDuration: workout.restDuration ?? 0 }
          ] 
        })),

        reorderWorkouts: (startIndex, endIndex) => set((state) => {
          const newWorkouts = [...state.workouts];
          const [removed] = newWorkouts.splice(startIndex, 1);
          newWorkouts.splice(endIndex, 0, removed);
          return { workouts: newWorkouts };
        }),

        setFilter: (query) => set({ filterQuery: query }),

        deleteWorkout: (id) => set((state) => ({ 
          workouts: state.workouts.filter((w) => w.id !== id) 
        })),

        updateWorkout: (id, workout) => set((state) => ({
          workouts: state.workouts.map((w) => w.id === id ? { ...w, ...workout } : w),
        })),
        
        toggleSound: () => set((state) => ({ 
          settings: { ...state.settings, soundEnabled: !state.settings.soundEnabled } 
        })),

        toggleTheme: () => set((state) => {
          const newTheme = state.settings.theme === 'dark' ? 'light' : 'dark';
          if (newTheme === 'dark') document.documentElement.classList.add('dark');
          else document.documentElement.classList.remove('dark');
          
          return { 
            settings: { ...state.settings, theme: newTheme } 
          };
        }),

        addHistoryEntry: (entry) => set((state) => ({ 
          history: [entry, ...state.history]
        })),        
        
        clearHistory: () => set({ history: [] }),

        deleteHistoryEntry: (id) => set((state) => ({
          history: state.history.filter((entry) => entry.id !== id)
        })),

        importData: (data) => set({ 
          workouts: data.workouts ?? [], 
          history: data.history ?? [] 
        }),

        resetAll: () => set({ workouts: [], history: [] }),
      },
    }),
    {
      name: 'workout_store',
      partialize: (state) => {
        const { actions, ...rest } = state;
        return rest;
      },
      onRehydrateStorage: () => (state) => {
        if (state?.settings.theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    }
  )
);

export const useWorkoutActions = () => useWorkoutStore((state) => state.actions);
