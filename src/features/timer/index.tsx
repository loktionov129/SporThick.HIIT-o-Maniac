import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Play, Pause, RotateCcw, ArrowLeft, Zap, AlertCircle } from 'lucide-react';
import useWorkoutStore from '../../store/useWorkoutStore';
import { ProgressCircle } from './components/ProgressCircle';
import { TimerFinished } from './components/TimerFinished';
import { Button } from '../../components/ui/Button';

const TimerScreen: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedWorkoutId = searchParams.get('workoutId');
  const workouts = useWorkoutStore((state) => state.workouts);
  const workout = selectedWorkoutId ? workouts.find(w => w.id === selectedWorkoutId) : null;
  
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);

  const currentExercise = workout?.exercises[currentExerciseIndex];

  useEffect(() => {
    if (currentExercise) setRemainingTime(currentExercise.duration);
  }, [currentExerciseIndex, workout]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && remainingTime > 0) {
      interval = setInterval(() => setRemainingTime(prev => prev - 1), 1000);
    } else if (remainingTime === 0 && isRunning) {
      if (workout && currentExerciseIndex < workout.exercises.length - 1) {
        setCurrentExerciseIndex(prev => prev + 1);
        setIsRunning(false); 
      } else {
        setIsRunning(false);
      }
    }
    return () => clearInterval(interval!);
  }, [isRunning, remainingTime]);

  const FullScreenCenter = ({ children }: { children: React.ReactNode }) => (
    <div className="h-[70vh] flex flex-col items-center justify-center animate-in fade-in duration-500">
      {children}
    </div>
  );

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

  const isFinished = currentExerciseIndex >= workout.exercises.length - 1 && remainingTime === 0;
  const progress = currentExercise ? (remainingTime / currentExercise.duration) * 100 : 0;

  if (isFinished) {
    return (
      <FullScreenCenter>
        <TimerFinished onFinish={() => navigate('/')} />
      </FullScreenCenter>
    );
  }

  return (
    <div className="flex flex-col items-center h-[75vh] justify-center relative">
      <div className="w-full absolute -top-4 left-0 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="cursor-pointer p-3 bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-white rounded-2xl transition-all active:scale-90">
          <ArrowLeft size={20} />
        </button>
        <div className="text-right">
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] leading-none mb-1">{workout.name}</p>
          <p className="text-blue-500 font-black text-sm leading-none">
            {currentExerciseIndex + 1} <span className="text-[10px] text-slate-600">из</span> {workout.exercises.length}
          </p>
        </div>
      </div>

      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-3">
           <Zap size={16} className="text-blue-500 fill-blue-500 animate-pulse" />
           <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px]">В процессе</span>
        </div>
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter sm:text-6xl drop-shadow-2xl">
          {currentExercise?.name}
        </h2>
      </div>

      <ProgressCircle remainingTime={remainingTime} progress={progress} />

      <div className="flex items-center gap-4 w-full max-w-sm">
        <Button 
          variant="secondary" 
          onClick={() => { setIsRunning(false); setRemainingTime(currentExercise?.duration || 0); }}
          className="p-5"
        >
          <RotateCcw size={24} />
        </Button>
        
        <Button 
          variant={isRunning ? 'secondary' : 'primary'}
          onClick={() => setIsRunning(!isRunning)}
          className="flex-1 py-5 text-lg uppercase tracking-[0.2em]"
        >
          {isRunning ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
          <span>{isRunning ? 'Пауза' : 'Старт'}</span>
        </Button>
      </div>
    </div>
  );
};

export default TimerScreen;
