import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Play, Pause, RotateCcw, ArrowLeft, Zap, Coffee, AlertCircle } from 'lucide-react';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import { ProgressCircle } from './components/ProgressCircle';
import { TimerFinished } from './components/TimerFinished';
import { Button } from '../../components/ui/Button';
import { playSignal } from '../../utils/beep';
import { FullScreenCenter } from './components/FullScreenCenter';

export const TimerScreen: React.FC = () => {
  const lastTickRef = useRef<number>(Date.now());
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedWorkoutId = searchParams.get('workoutId');
  const workouts = useWorkoutStore((state) => state.workouts);
  const addHistoryEntry = useWorkoutStore((state) => state.addHistoryEntry);
  const workout = selectedWorkoutId ? workouts.find(w => w.id === selectedWorkoutId) : null;

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [wasStarted, setWasStarted] = useState(false);

  const currentExercise = workout?.exercises[currentExerciseIndex];

  useEffect(() => {
    if (currentExercise && remainingTime === 0 && !isRunning && !isResting) {
      setRemainingTime(currentExercise.duration);
    }
  }, [workout]);

  useEffect(() => {
  let lock: any = null;
  const requestLock = async () => {
    try {
      if ('wakeLock' in navigator) {
        lock = await (navigator as any).wakeLock.request('screen');
      }
    } catch (err) {}
  };

  if (isRunning) requestLock();
  else lock?.release().then(() => lock = null);

  return () => { lock?.release(); };
}, [isRunning]);


  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isRunning) {
      lastTickRef.current = Date.now();

      interval = setInterval(() => {
        const now = Date.now();
        const delta = Math.floor((now - lastTickRef.current) / 1000);

        if (delta >= 1) {
          setRemainingTime((prev) => {
            const newValue = prev - delta;
            const finalValue = newValue < 0 ? 0 : newValue;
            
            if (finalValue <= 3 && finalValue > 0 && prev > 3) {
              playSignal('COUNTDOWN');
            }
            
            return finalValue;
          });
          lastTickRef.current = now;
        }
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  useEffect(() => {
    if (remainingTime === 0 && isRunning && workout) {
      if (!isResting && (workout.restDuration || 0) > 0) {
        setIsResting(true);
        setRemainingTime(workout.restDuration || 0);
        playSignal('END_WORK');
      } else {
        setIsResting(false);
        if (currentExerciseIndex < workout.exercises.length - 1) {
          const nextIndex = currentExerciseIndex + 1;
          setCurrentExerciseIndex(nextIndex);
          setRemainingTime(workout.exercises[nextIndex].duration);
          playSignal('START_WORK');
        } else if (currentRound < (workout.rounds || 1)) {
          setCurrentRound(prev => prev + 1);
          setCurrentExerciseIndex(0);
          setRemainingTime(workout.exercises[0].duration);
          playSignal('END_ROUND');
        } else {
          setIsRunning(false);
          playSignal('FINISH');
        }
      }
      lastTickRef.current = Date.now();
    }
  }, [remainingTime, isRunning, workout, isResting, currentExerciseIndex, currentRound]);

useEffect(() => {
  const syncTime = () => {
    if (document.visibilityState === 'visible' && isRunning) {
      const now = Date.now();
      const delta = Math.floor((now - lastTickRef.current) / 1000);
      if (delta >= 1) {
        setRemainingTime(prev => Math.max(0, prev - delta));
        lastTickRef.current = now;
      }
    }
  };

  document.addEventListener('visibilitychange', syncTime);
  return () => document.removeEventListener('visibilitychange', syncTime);
}, [isRunning]);


  const isFinished = wasStarted && currentRound >= (workout?.rounds || 1) && 
                     currentExerciseIndex >= (workout?.exercises.length || 1) - 1 && 
                     remainingTime === 0 && !isResting;

  const hasSaved = React.useRef(false);
  useEffect(() => {
    if (isFinished && workout && !hasSaved.current) {
      const exercisesTime = workout.exercises.reduce((acc, ex) => acc + ex.duration, 0);
      const totalRestTime = workout.exercises.length * (workout.restDuration || 0);
      const totalTime = (exercisesTime + totalRestTime) * (workout.rounds || 1);
      console.log('saved');
      hasSaved.current = true;

      addHistoryEntry({
        id: Date.now().toString(),
        workoutId: workout.id,
        workoutName: workout.name,
        timestamp: Date.now(),
        totalTime,
        totalRounds: workout.rounds,
      });
    }
  }, [isFinished, workout, addHistoryEntry]);

  if (!workout) {
    return (
      <FullScreenCenter>
        <div className="bg-red-500/10 p-6 rounded-full mb-6 border border-red-500/20">
          <AlertCircle className="text-red-500 w-12 h-12" />
        </div>
        <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-8">Тренировка не найдена</h2>
        <Button className="mt-10" variant="secondary" onClick={() => navigate('/')}>Назад в меню</Button>
      </FullScreenCenter>
    );
  }

  if (isFinished) {
    const totalExercisesTime = workout.exercises.reduce((acc, ex) => acc + ex.duration, 0);
    const totalRestTimePerRound = (workout.exercises.length) * (workout.restDuration || 0);
    const totalWorkoutSeconds = (totalExercisesTime + totalRestTimePerRound) * (workout.rounds || 1);

    return (
      <FullScreenCenter>
        <TimerFinished 
          onFinish={() => navigate('/')} 
          totalTime={totalWorkoutSeconds}
          totalRounds={workout.rounds || 1}
        />
      </FullScreenCenter>
    );
  }

  const totalDuration = isResting ? (workout.restDuration || 1) : (currentExercise?.duration || 1);
  const progress = (remainingTime / totalDuration) * 100;

  return (
    <div className="flex flex-col items-center h-[75vh] justify-center relative">
      <div className="w-full absolute -top-4 left-0 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="cursor-pointer p-3 bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-white rounded-2xl transition-all active:scale-90">
          <ArrowLeft size={20} />
        </button>
        <div className="text-right">
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] leading-none mb-1">
            Круг {currentRound} из {workout.rounds}
          </p>
          <p className="text-blue-500 font-black text-sm leading-none italic">
            {isResting ? 'ОТДЫХ' : `УПР. ${currentExerciseIndex + 1}/${workout.exercises.length}`}
          </p>
        </div>
      </div>

      <div className="text-center mb-12 animate-in fade-in duration-300" key={isResting ? 'rest' : 'work'}>
        <div className="flex items-center justify-center gap-2 mb-3">
           {isResting ? (
             <Coffee size={16} className="text-emerald-500" />
           ) : (
             <Zap size={16} className="text-blue-500 fill-blue-500 animate-pulse" />
           )}
           <span className={`font-black uppercase tracking-[0.3em] text-[10px] ${isResting ? 'text-emerald-500' : 'text-blue-500'}`}>
             {isResting ? 'Перерыв' : workout.name}
           </span>
        </div>
        <h2 className={`text-4xl font-black uppercase tracking-tighter sm:text-6xl drop-shadow-2xl transition-colors ${isResting ? 'text-emerald-400' : 'text-white'}`}>
          {isResting ? 'ОТДЫХАЙ' : currentExercise?.name}
        </h2>
      </div>

      <ProgressCircle 
        remainingTime={remainingTime} 
        progress={progress} 
        isResting={isResting}
      />

      <div className="flex items-center gap-4 w-full max-w-sm">
        <Button 
          variant="secondary" 
          onClick={() => { setIsRunning(false); setIsResting(false); setCurrentExerciseIndex(0); setRemainingTime(workout.exercises[0].duration); setCurrentRound(1); setWasStarted(false);}}
          className="p-5"
        >
          <RotateCcw size={24} />
        </Button>
        
        <Button 
          variant={isRunning ? 'secondary' : 'primary'}
          onClick={() => {setWasStarted(true); setIsRunning(!isRunning); lastTickRef.current = Date.now(); }}
          className="flex-1 py-5 text-lg uppercase tracking-[0.2em]"
        >
          {isRunning ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
          <span>{isRunning ? 'Пауза' : 'Старт'}</span>
        </Button>
      </div>
    </div>
  );
};
