import React, { useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useWorkoutStore, useWorkoutActions } from '../../store/useWorkoutStore';
import { useWorkoutTimer } from './hooks/useWorkoutTimer';
import { useWakeLock } from './hooks/useWakeLock';
import { TimerHeader } from './components/TimerHeader';
import { TimerControls } from './components/TimerControls';
import { TimerDisplay } from './components/TimerDisplay';
import { ProgressCircle } from './components/ProgressCircle';
import { TimerFinished } from './components/TimerFinished';
import { NotFoundView } from './components/NotFoundView';

export const TimerScreen: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { workouts } = useWorkoutStore();
  const { addHistoryEntry } = useWorkoutActions();
  
  const workout = workouts.find(w => w.id === searchParams.get('workoutId')) || null;

  const onFinish = useCallback((totalTime: number) => {
    if (!workout) {
      return;
    }
    
    addHistoryEntry({
      id: Date.now().toString(),
      workoutId: workout.id,
      workoutName: workout.name,
      timestamp: Date.now(),
      totalTime,
      totalRounds: workout.rounds,
    });
  }, [workout, addHistoryEntry]);

  const { state, actions } = useWorkoutTimer(workout, onFinish);
  useWakeLock(state.isRunning);

  if (!workout) return <NotFoundView onBack={() => navigate('/')} />;

  const isFinished = state.wasStarted && state.remainingTime === 0 && !state.isRunning;
  if (isFinished) {
    return <TimerFinished onFinish={() => navigate('/')} totalTime={0} totalRounds={workout.rounds} />;
  }

  const currentEx = workout.exercises[state.currentExerciseIndex];
  const totalDuration = state.isResting ? (workout.restDuration || 1) : (currentEx?.duration || 1);

  return (
    <div className="">
      
      <div className="">
        <TimerHeader 
          round={state.currentRound} 
          totalRounds={workout.rounds}
          currentEx={state.currentExerciseIndex} 
          totalEx={workout.exercises.length}
          isResting={state.isResting} 
          onBack={() => navigate(-1)}
        />
      </div>

      <div className="">
        <div className="">
          <TimerDisplay 
            isResting={state.isResting} 
            workoutName={workout.name} 
            exerciseName={currentEx?.name} 
          />

          <div className="">
            <ProgressCircle 
              remainingTime={state.remainingTime} 
              progress={(state.remainingTime / totalDuration) * 100} 
              isResting={state.isResting}
            />
          </div>
        </div>
      </div>

      <TimerControls 
        isRunning={state.isRunning}
        onToggle={actions.toggleRunning}
        onReset={actions.handleReset}
      />
      
    </div>
  );
};
