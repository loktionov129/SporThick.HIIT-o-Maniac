import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SoundPreset, WorkoutSettings, WorkoutState } from '../types';
import { initManiacSounds } from '../utils/beep';


const defaultSettings: WorkoutSettings = { 
  soundEnabled: true,
  soundPreset: 'maniac',
  vibrationEnabled: false,
  theme: 'dark',
  hasSeenOnboarding: false,
};

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set) => ({
      workouts: [],
      history: [],
      settings: defaultSettings,
      filterQuery: '',

      actions: {
        completeOnboarding: () => set((state) => ({
          settings: { ...state.settings, hasSeenOnboarding: true }
        })),
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
        
        setSoundPreset: (preset: SoundPreset) => {
          set((state) => ({
            settings: { ...state.settings, soundPreset: preset }
          }));
          // После смены пресета перекачиваем буферы
          initManiacSounds(); 
        },
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

        resetAll: () => {
          set({ workouts: [], history: [], settings: defaultSettings });
          window.location.hash = '#/';
        },
      },
    }),
    {
      name: 'workout_store',
      partialize: (state) => {
        const { actions, ...rest } = state;
        return rest;
      },
      onRehydrateStorage: () => (state) => {
        if (state?.settings.soundEnabled) {
          initManiacSounds();
        }
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
