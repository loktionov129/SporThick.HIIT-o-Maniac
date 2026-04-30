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
  settings: {
    soundEnabled: boolean;
  };
}

export interface WorkoutHistoryEntry {
  id: string;
  workoutId: string;
  workoutName: string;
  timestamp: number;
  totalTime: number;
  totalRounds: number;
}
