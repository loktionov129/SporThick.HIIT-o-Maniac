import React, { useState, useEffect } from 'react';
import useWorkoutStore from '../store/useWorkoutStore';
import { useSearchParams } from 'react-router-dom';

const TimerScreen: React.FC = () => {
  const [searchParams] = useSearchParams();
  const selectedWorkoutId = searchParams.get('workoutId');
  const workouts = useWorkoutStore((state) => state.workouts);
  const workout = selectedWorkoutId ? workouts.find(w => w.id === selectedWorkoutId) : null;
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (workout && currentExerciseIndex < workout.exercises.length) {
      const exercise = workout.exercises[currentExerciseIndex];
      setRemainingTime(exercise.duration);
    }
  }, [workout, currentExerciseIndex]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && remainingTime !== null && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime! - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setCurrentExerciseIndex(prevIndex => prevIndex + 1);
      setIsRunning(false);
    }

    return () => clearInterval(interval!);
  }, [isRunning, remainingTime]);

  const startPause = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setIsRunning(false);
    setRemainingTime(workout?.exercises[currentExerciseIndex].duration || null);
  };

  if (!workout) return <div>No workout selected</div>;

  return (
    <div className="text-center">
      <h2>Timer Screen</h2>
      <p>Current Exercise: {workout.exercises[currentExerciseIndex].name}</p>
      <p>Remaining Time: {remainingTime}s</p>
      <button onClick={startPause} className="bg-blue-500 text-white px-4 py-2 rounded">
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={reset} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">
        Reset
      </button>
    </div>
  );
};

export default TimerScreen;