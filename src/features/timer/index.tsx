import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useWorkoutStore, useWorkoutActions } from '../../store/useWorkoutStore';
import { useWorkoutTimer } from './hooks/useWorkoutTimer';
import { useWakeLock } from './hooks/useWakeLock';
import { TimerHeader } from './components/TimerHeader';
import { TimerDisplay } from './components/TimerDisplay';
import { ProgressCircle } from './components/ProgressCircle';
import { TimerControls } from './components/TimerControls';
import { NotFoundView } from './components/NotFoundView';
import { TimerFinished } from './components/TimerFinished';

export const TimerScreen: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { workouts } = useWorkoutStore();
  const { addHistoryEntry } = useWorkoutActions();
  
  const workout = workouts.find(w => w.id === searchParams.get('workoutId')) || null;

  const onFinish = useCallback((totalTime: number) => {
    if (!workout) {
      return;
    }
    
    addHistoryEntry({
      id: crypto.randomUUID(),
      workoutId: workout.id,
      workoutName: workout.name,
      timestamp: Date.now(),
      totalTime,
      totalRounds: workout.rounds,
    });
  }, [workout, addHistoryEntry]);

  const { state, actions } = useWorkoutTimer(workout, onFinish);
  useWakeLock(state.isRunning);

  if (!workout) {
    return <NotFoundView />;
  }

  const isFinished = state.wasStarted && state.remainingTime === 0 && !state.isRunning;
  if (isFinished) {
    const totalExercisesTime = workout.exercises.reduce((acc, ex) => acc + ex.duration, 0);
    const totalRestTimePerRound = (workout.exercises.length) * (workout.restDuration || 0);
    const totalWorkoutSeconds = (totalExercisesTime + totalRestTimePerRound) * (workout.rounds || 1);
    return <TimerFinished totalTime={totalWorkoutSeconds} totalRounds={workout.rounds} />;
  }

  const currentEx = workout.exercises[state.currentExerciseIndex];
  const totalDuration = state.isResting ? (workout.restDuration || 1) : (currentEx?.duration || 1);

  return (
    <div className="h-[100dvh] w-full max-w-md mx-auto flex flex-col bg-surface-main overflow-hidden relative">
      
      {/* 1. HEADER: Прогресс раундов и упр. */}
      <div className="shrink-0 p-2 z-20">
        <TimerHeader 
          round={state.currentRound} 
          totalRounds={workout.rounds}
          currentEx={state.currentExerciseIndex} 
          totalEx={workout.exercises.length}
          isResting={state.isResting} 
        />
      </div>

      {/* 2. MAIN CONTENT: Только Дисплей и Круг */}
      <main className="flex-1 flex flex-col items-center justify-evenly px-6 py-4 relative z-10">
        
        {/* Что делаем сейчас */}
        <div className="w-full text-center animate-in fade-in slide-in-from-top-4 duration-700">
          <TimerDisplay 
            isResting={state.isResting} 
            workoutName={workout.name} 
            exerciseName={currentEx?.name} 
          />
        </div>

        {/* Главный Визуальный Якорь */}
        <div className="relative flex items-center justify-center scale-110 xs:scale-125 transition-transform duration-500">
          <ProgressCircle 
            remainingTime={state.remainingTime} 
            progress={(state.remainingTime / totalDuration) * 100} 
            isResting={state.isResting}
          />
        </div>

        {/* Пустое место для "воздуха" или подсказки следующего упражнения */}
        {!state.isResting && state.currentExerciseIndex < workout.exercises.length - 1 ? (
          <div className="flex flex-col items-center opacity-20">
            <span className="text-[8px] font-black uppercase tracking-[0.4em] mb-1 italic">Далее</span>
            <span className="text-xs font-black uppercase italic tracking-wider truncate max-w-[200px]">
              {workout.exercises[state.currentExerciseIndex + 1].name}
            </span>
          </div>
        ) : <div className="h-8" />}
      </main>

      {/* 3. CONTROLS: Управление в самом низу */}
      <div className="shrink-0 p-8 pb-12 z-20">
        <TimerControls 
          isRunning={state.isRunning}
          onToggle={actions.toggleRunning}
          onReset={actions.handleReset}
        />
      </div>

      {/* ФОНОВЫЕ ЭФФЕКТЫ */}
      {state.isResting && (
        <div className="absolute inset-0 bg-brand-emerald/[0.03] animate-pulse -z-10" />
      )}
    </div>
  );
};
