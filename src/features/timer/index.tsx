import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Play, Pause, RotateCcw, ArrowLeft, Zap, AlertCircle, Coffee } from 'lucide-react';
import useWorkoutStore from '../../store/useWorkoutStore';
import { ProgressCircle } from './components/ProgressCircle';
import { TimerFinished } from './components/TimerFinished';
import { Button } from '../../components/ui/Button';
import { playSignal } from '../../utils/beep';

const TimerScreen: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedWorkoutId = searchParams.get('workoutId');
  const workouts = useWorkoutStore((state) => state.workouts);
  const workout = selectedWorkoutId ? workouts.find(w => w.id === selectedWorkoutId) : null;

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [isResting, setIsResting] = useState(false); // ФАЗА ОТДЫХА

  const currentExercise = workout?.exercises[currentExerciseIndex];

  // Инициализация времени при старте
  useEffect(() => {
    if (currentExercise && remainingTime === 0 && !isRunning && !isResting) {
      setRemainingTime(currentExercise.duration);
    }
  }, [workout]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isRunning && remainingTime > 0) {
      interval = setInterval(() => {
        // Звук за 3 секунды до конца (в любой фазе)
        if (remainingTime <= 3) playSignal('COUNTDOWN');
        setRemainingTime(prev => prev - 1);
      }, 1000);
    } else if (remainingTime === 0 && isRunning && workout) {
      
      // ЛОГИКА ПЕРЕКЛЮЧЕНИЯ ФАЗ
      if (!isResting && (workout.restDuration || 0) > 0) {
        // 1. Закончили упражнение -> Уходим на отдых (если он настроен)
        setIsResting(true);
        setRemainingTime(workout.restDuration || 0);
        playSignal('END_WORK');
      } else {
        // 2. Закончили отдых (или его не было) -> Следующее упражнение
        setIsResting(false);
        
        if (currentExerciseIndex < workout.exercises.length - 1) {
          const nextIndex = currentExerciseIndex + 1;
          setCurrentExerciseIndex(nextIndex);
          setRemainingTime(workout.exercises[nextIndex].duration);
          playSignal('START_WORK');
        } 
        else if (currentRound < (workout.rounds || 1)) {
          // Конец круга
          setCurrentRound(prev => prev + 1);
          setCurrentExerciseIndex(0);
          setRemainingTime(workout.exercises[0].duration);
          playSignal('END_ROUND');
        } 
        else {
          // Финиш всей тренировки
          setIsRunning(false);
          playSignal('FINISH');
        }
      }
    }
    return () => clearInterval(interval!);
  }, [isRunning, remainingTime, currentExerciseIndex, currentRound, isResting, workout]);

  // Проверка на финиш для рендера
  const isFinished = currentRound >= (workout?.rounds || 1) && 
                     currentExerciseIndex >= (workout?.exercises.length || 1) - 1 && 
                     remainingTime === 0 && !isResting;

  if (!workout) return <div className="text-white text-center py-20">Workout not found</div>;
  if (isFinished) return <TimerFinished onFinish={() => navigate('/')} />;

  // Расчет прогресса для круга
  const totalDuration = isResting ? (workout.restDuration || 1) : (currentExercise?.duration || 1);
  const progress = (remainingTime / totalDuration) * 100;

  return (
    <div className="flex flex-col items-center h-[75vh] justify-center relative">
      {/* Навигация */}
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

      {/* Центральный блок */}
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

      {/* Кольцо с поддержкой цвета отдыха */}
      <ProgressCircle 
        remainingTime={remainingTime} 
        progress={progress} 
        variant={isResting ? 'rest' : 'work'} 
      />

      {/* Контролы */}
      <div className="flex items-center gap-4 w-full max-w-sm">
        <Button 
          variant="secondary" 
          onClick={() => { setIsRunning(false); setIsResting(false); setCurrentExerciseIndex(0); setRemainingTime(workout.exercises[0].duration); }}
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
