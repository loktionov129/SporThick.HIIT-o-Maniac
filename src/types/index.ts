export interface Exercise {
  id: string;
  name: string;
  duration: number; // in seconds
}

export interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
  rounds: number; // 0 means infinite
}

export interface AppState {
  workouts: Workout[];
  settings: {
    soundEnabled: boolean;
  };
}