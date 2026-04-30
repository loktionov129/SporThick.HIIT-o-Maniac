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