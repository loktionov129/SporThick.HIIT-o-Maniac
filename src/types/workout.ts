export interface Exercise {
  id: string;
  name: string;
  duration: number;
}

export interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
  rounds: number;
  restDuration: number;
}

export interface AppState {
  workouts: Workout[];
  settings: WorkoutSettings;
}

export interface WorkoutHistoryEntry {
  id: string;
  workoutId: string;
  workoutName: string;
  timestamp: number;
  totalTime: number;
  totalRounds: number;
}

export interface WorkoutSettings { 
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  theme: 'dark' | 'light';
  hasSeenOnboarding: boolean;
}

export interface WorkoutState {
  workouts: Workout[];
  history: WorkoutHistoryEntry[];
  settings: WorkoutSettings;
  filterQuery: string;
  actions: {
    completeOnboarding: () => void;
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