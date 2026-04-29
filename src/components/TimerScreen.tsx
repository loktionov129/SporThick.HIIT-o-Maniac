import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Play, Pause, RotateCcw, ArrowLeft, Trophy, Zap, Pencil, Dumbbell } from 'lucide-react';
import useWorkoutStore from '../store/useWorkoutStore';

const TimerScreen: React.FC = () => {
  const [searchParams] = useSearchParams();
  const selectedWorkoutId = searchParams.get('workoutId');
  const workouts = useWorkoutStore((state) => state.workouts);
  const workout = selectedWorkoutId ? workouts.find(w => w.id === selectedWorkoutId) : null;
  const navigate = useNavigate();
  
  if (workout && workout.exercises.length === 0) {
    return (
      <div className="max-w-md mx-auto h-[80vh] flex flex-col items-center justify-center text-center px-6">
        <div className="bg-blue-500/10 p-6 rounded-full mb-6 ring-1 ring-blue-500/20">
          <Dumbbell className="text-blue-500 w-12 h-12 opacity-80" />
        </div>
        
        <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">
          В этой тренировке пусто
        </h2>
        <p className="text-slate-400 mb-8 leading-relaxed">
          Чтобы запустить таймер, нужно добавить хотя бы одно упражнение.
        </p>

        <div className="flex flex-col w-full gap-3 mt-10">
          <button 
            onClick={() => navigate(`/create-edit-workout?workoutId=${workout.id}`)}
            className="cursor-pointer w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-2"
          >
            <Pencil size={20} />
            Добавить упражнения
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="cursor-pointer w-full bg-slate-900 text-slate-400 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95"
          >
            Назад к списку
          </button>
        </div>
      </div>
    );
  }

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);

  const currentExercise = workout?.exercises[currentExerciseIndex];

  useEffect(() => {
    if (currentExercise) {
      setRemainingTime(currentExercise.duration);
    }
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

  if (!workout) return <div className="text-white text-center py-20">Workout not found</div>;

  const isFinished = currentExerciseIndex >= workout.exercises.length - 1 && remainingTime === 0;
  const progress = currentExercise ? (remainingTime / currentExercise.duration) * 100 : 0;

  return (
    // Добавляем h-[80vh] и justify-center, чтобы контент был по центру экрана
    <div className="max-w-md mx-auto h-[85vh] flex flex-col items-center justify-center">
      
      {/* Улучшенная навигация */}
      <div className="w-full absolute top-8 left-0 px-6 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="p-3 bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-white rounded-2xl transition-all active:scale-90"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="text-right">
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">
            {workout.name}
          </p>
          <p className="text-blue-500 font-black text-sm">
            EXERCISE {currentExerciseIndex + 1}/{workout.exercises.length}
          </p>
        </div>
      </div>

      {isFinished ? (
        <div className="text-center animate-in fade-in zoom-in duration-500">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-yellow-500 blur-3xl opacity-20" />
            <div className="relative bg-yellow-500/20 p-8 rounded-full inline-block border border-yellow-500/20">
              <Trophy className="text-yellow-500 w-20 h-20" />
            </div>
          </div>
          <h2 className="text-4xl font-black text-white mb-3 tracking-tight">BEAST MODE ON!</h2>
          <p className="text-slate-400 mb-10 text-lg">Workout completed successfully.</p>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-wider hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 active:scale-95"
          >
            Finish Session
          </button>
        </div>
      ) : (
        <>
          {/* Название упражнения с иконкой */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
               <Zap size={18} className="text-blue-500 fill-blue-500" />
               <span className="text-blue-500 font-bold uppercase tracking-[0.2em] text-[12px]">Current</span>
            </div>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter sm:text-5xl">
              {currentExercise?.name}
            </h2>
          </div>

          {/* Кольцо таймера — увеличил размер и добавил тени */}
          <div className="relative w-72 h-72 flex items-center justify-center mb-16">
            <div className="absolute inset-0 bg-blue-600/5 blur-3xl rounded-full" />
            <svg className="absolute w-full h-full -rotate-90 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <circle
                cx="144" cy="144" r="130"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="12"
                className="text-slate-900"
              />
              <circle
                cx="144" cy="144" r="130"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="12"
                strokeDasharray={816}
                strokeDashoffset={816 - (816 * progress) / 100}
                className="text-blue-500 transition-all duration-1000 ease-linear"
                strokeLinecap="round"
              />
            </svg>
            
            <div className="flex flex-col items-center relative z-10">
              <span className="text-8xl font-black text-white tabular-nums tracking-tighter">
                {remainingTime}
              </span>
              <span className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[11px] mt-1">
                Seconds
              </span>
            </div>
          </div>

          {/* Улучшенные контролы */}
          <div className="flex items-center gap-4 w-full">
            <button 
              onClick={() => { setIsRunning(false); setRemainingTime(currentExercise?.duration || 0); }}
              className="p-5 bg-slate-900 border border-slate-800 text-slate-500 rounded-3xl hover:text-white transition-all active:scale-90"
            >
              <RotateCcw size={24} />
            </button>
            
            <button 
              onClick={() => setIsRunning(!isRunning)}
              className={`flex-1 py-5 rounded-3xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 shadow-2xl ${
                isRunning 
                  ? 'bg-slate-100 text-slate-950 shadow-white/5' 
                  : 'bg-blue-600 text-white shadow-blue-600/30'
              }`}
            >
              {isRunning ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
              <span className="text-lg">{isRunning ? 'Pause' : 'Start'}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TimerScreen;
