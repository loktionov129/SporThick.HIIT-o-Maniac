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
      className="text-center mb-10 sm:mb-12 animate-in fade-in duration-500" 
      key={isResting ? 'rest' : 'work'}
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        {isResting ? (
          <Coffee size={18} className="text-brand-emerald" />
        ) : (
          <Zap size={18} className="text-brand-blue fill-brand-blue animate-pulse" />
        )}
        <span className={`font-black uppercase tracking-[0.3em] text-[11px] italic ${
          isResting ? 'text-brand-emerald' : 'text-brand-blue'
        }`}>
          {isResting ? 'Перерыв' : workoutName}
        </span>
      </div>
      
      <h2 className={`text-4xl font-black uppercase tracking-tighter sm:text-7xl drop-shadow-2xl transition-colors duration-500 leading-none italic ${
        isResting ? 'text-brand-emerald' : 'text-text-primary'
      }`}>
        {isResting ? 'ОТДЫХАЙ' : exerciseName}
      </h2>
    </div>
  );
};
