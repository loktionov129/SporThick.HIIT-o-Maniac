import { useState, useEffect, useRef, useCallback } from 'react';
import { playSignal } from '../../../utils/beep';
import type { Workout } from '../../../types';

export const useWorkoutTimer = (workout: Workout | null, onFinish: (totalTime: number) => void) => {
  const [currentExerciseIndex, setIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentRound, setRound] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [wasStarted, setWasStarted] = useState(false);
  
  const lastTickRef = useRef<number>(Date.now());

  useEffect(() => {
    if (workout && !wasStarted) setRemainingTime(workout.exercises[0].duration);
  }, [workout, wasStarted]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      lastTickRef.current = Date.now();
      interval = setInterval(() => {
        const now = Date.now();
        const delta = Math.floor((now - lastTickRef.current) / 1000);
        if (delta >= 1) {
          setRemainingTime(prev => {
            const next = Math.max(0, prev - delta);
            if (next <= 3 && next > 0 && prev > 3) playSignal('COUNTDOWN');
            return next;
          });
          lastTickRef.current = now;
        }
      }, 100);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isRunning]);

  useEffect(() => {
    if (remainingTime === 0 && isRunning && workout) {
      if (!isResting && (workout.restDuration || 0) > 0) {
        setIsResting(true);
        setRemainingTime(workout.restDuration);
        playSignal('END_WORK');
      } else {
        setIsResting(false);
        if (currentExerciseIndex < workout.exercises.length - 1) {
          setIndex(i => i + 1);
          setRemainingTime(workout.exercises[currentExerciseIndex + 1].duration);
          playSignal('START_WORK');
        } else if (currentRound < workout.rounds) {
          setRound(r => r + 1);
          setIndex(0);
          setRemainingTime(workout.exercises[0].duration);
          playSignal('END_ROUND');
        } else {
          setIsRunning(false);
          const totalTime = (workout.exercises.reduce((a, e) => a + e.duration, 0) + 
            (workout.exercises.length * (workout.restDuration || 0))) * workout.rounds;
          onFinish(totalTime);
          playSignal('FINISH');
        }
      }
      lastTickRef.current = Date.now();
    }
  }, [remainingTime, isRunning, workout, isResting, currentExerciseIndex, currentRound, onFinish]);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setIsResting(false);
    setIndex(0);
    setRound(1);
    setWasStarted(false);
    if (workout) setRemainingTime(workout.exercises[0].duration);
  }, [workout]);

  const toggleRunning = useCallback(() => {
    setWasStarted(true);
    setIsRunning(prev => !prev);
    lastTickRef.current = Date.now();
  }, []);

  return {
    state: { currentExerciseIndex, remainingTime, isRunning, currentRound, isResting, wasStarted },
    actions: { toggleRunning, handleReset }
  };
};
