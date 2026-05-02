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
      className="flex flex-col items-center text-center space-y-2 animate-in fade-in zoom-in duration-500" 
      key={isResting ? 'rest' : 'work'}
    >
      {/* ВЕРХНЯЯ СТРОКА: Название программы или статус "Перерыв" */}
      <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-surface-accent/30 border border-text-primary/5">
        {isResting ? (
          <Coffee size={14} className="text-brand-emerald animate-pulse" />
        ) : (
          <Zap size={14} className="text-brand-blue animate-pulse" fill="currentColor" />
        )}
        <span className={`text-[10px] font-black uppercase tracking-[0.2em] italic ${
          isResting ? 'text-brand-emerald' : 'text-brand-blue'
        }`}>
          {isResting ? 'Время восстановиться' : workoutName}
        </span>
      </div>
      
      {/* ГЛАВНЫЙ ЗАГОЛОВОК: Что делать сейчас */}
      <h2 className={`
        text-4xl xs:text-5xl font-black uppercase italic tracking-tighter leading-tight px-4
        ${isResting ? 'text-brand-emerald' : 'text-text-primary'}
      `}>
        {isResting ? 'ОТДЫХАЙ' : exerciseName}
      </h2>
    </div>
  );
};
