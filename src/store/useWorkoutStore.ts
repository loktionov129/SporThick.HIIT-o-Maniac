import create from 'zustand';

interface WorkoutState {
  workouts: Workout[];
  settings: { soundEnabled: boolean };
  addWorkout(workout: Workout): void;
  updateWorkout(id: string, workout: Partial<Workout>): void;
  deleteWorkout(id: string): void;
  toggleSound(): void;
}

const useWorkoutStore = create<WorkoutState>((set) => ({
  workouts: [],
  settings: { soundEnabled: true },
  addWorkout: (workout) =>
    set((state) => ({ workouts: [...state.workouts, workout] })),
  updateWorkout: (id, workout) =>
    set((state) => ({
      workouts: state.workouts.map((w) =>
        w.id === id ? { ...w, ...workout } : w
      ),
    })),
  deleteWorkout: (id) =>
    set((state) => ({ workouts: state.workouts.filter((w) => w.id !== id) })),
  toggleSound: () =>
    set((state) => ({
      settings: { soundEnabled: !state.settings.soundEnabled },
    })),
}));

export default useWorkoutStore;