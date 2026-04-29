import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Play, Pause, RotateCcw, ArrowLeft, Trophy } from 'lucide-react';
import useWorkoutStore from '../store/useWorkoutStore';

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
    <div className="max-w-md mx-auto flex flex-col items-center">
      {/* Header-like Navigation */}
      <div className="w-full flex items-center justify-between mb-12">
        <button onClick={() => navigate(-1)} className="p-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={24} />
        </button>
        <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">
          {workout.name} • {currentExerciseIndex + 1}/{workout.exercises.length}
        </span>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {isFinished ? (
        <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
          <div className="bg-yellow-500/20 p-6 rounded-full inline-block mb-6">
            <Trophy className="text-yellow-500 w-16 h-16" />
          </div>
          <h2 className="text-3xl font-black text-white mb-2">Workout Done!</h2>
          <p className="text-slate-400 mb-8">You're a beast! Keep it up.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
          >
            Back to List
          </button>
        </div>
      ) : (
        <>
          {/* Название упражнения */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">
              {currentExercise?.name}
            </h2>
            <p className="text-slate-500 font-medium">Get ready and push it!</p>
          </div>

          {/* Кольцо таймера (упрощенное через прогресс-бар) */}
          <div className="relative w-64 h-64 flex items-center justify-center mb-12">
            {/* Фон прогресса */}
            <svg className="absolute w-full h-full -rotate-90">
              <circle
                cx="128" cy="128" r="120"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="8"
                className="text-slate-800"
              />
              <circle
                cx="128" cy="128" r="120"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={754}
                strokeDashoffset={754 - (754 * progress) / 100}
                className="text-blue-500 transition-all duration-1000 ease-linear"
                strokeLinecap="round"
              />
            </svg>
            
            <div className="flex flex-col items-center">
              <span className="text-7xl font-black text-white tabular-nums">
                {remainingTime}
              </span>
              <span className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[12px] mt-2">
                Seconds
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6 w-full px-4">
            <button 
              onClick={() => { setIsRunning(false); setRemainingTime(currentExercise?.duration || 0); }}
              className="flex-1 bg-slate-900 border border-slate-800 text-slate-400 py-4 rounded-3xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-95"
            >
              <RotateCcw size={20} />
              Reset
            </button>
            
            <button 
              onClick={() => setIsRunning(!isRunning)}
              className={`flex-[1.5] py-4 rounded-3xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl ${
                isRunning 
                  ? 'bg-amber-500 text-amber-950 shadow-amber-500/20' 
                  : 'bg-blue-600 text-white shadow-blue-600/20'
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
