import React from 'react';
import { Zap, Coffee } from 'lucide-react';

interface Props {
  isResting: boolean;
  workoutName: string;
  exerciseName?: string;
}

export const TimerDisplay: React.FC<Props> = ({ isResting, workoutName, exerciseName }) => {
  return (
    <div 
      className="text-center mb-12 animate-in fade-in duration-300" 
      key={isResting ? 'rest' : 'work'}
    >
      <div className="flex items-center justify-center gap-2 mb-3">
        {isResting ? (
          <Coffee size={16} className="text-emerald-500" />
        ) : (
          <Zap size={16} className="text-blue-500 fill-blue-500 animate-pulse" />
        )}
        <span className={`font-black uppercase tracking-[0.3em] text-[10px] ${
          isResting ? 'text-emerald-500' : 'text-blue-500'
        }`}>
          {isResting ? 'Перерыв' : workoutName}
        </span>
      </div>
      
      <h2 className={`text-4xl font-black uppercase tracking-tighter sm:text-6xl drop-shadow-2xl transition-colors ${
        isResting ? 'text-emerald-400' : 'text-white'
      }`}>
        {isResting ? 'ОТДЫХАЙ' : exerciseName}
      </h2>
    </div>
  );
};
