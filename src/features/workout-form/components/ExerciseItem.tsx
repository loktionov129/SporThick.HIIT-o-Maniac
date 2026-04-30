import React from 'react';
import { Trash2 } from 'lucide-react';
import { type Exercise } from '../../../types';
import { TimerInput } from '../../../components/ui/TimerInput';

interface ExerciseItemProps {
  exercise: Exercise;
  index: number;
  onUpdate: (id: string, field: 'name' | 'duration', value: string | number) => void;
  onRemove: (id: string) => void;
}

export const ExerciseItem: React.FC<ExerciseItemProps> = ({ exercise, index, onUpdate, onRemove }) => {
  return (
    <div className="group bg-surface-card border border-text-muted/10 p-3 sm:p-4 rounded-2xl flex items-center gap-3 sm:gap-4 transition-all duration-300 focus-within:border-brand-blue/30 focus-within:shadow-lg focus-within:shadow-brand-blue/5">
      
      <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-brand-blue rounded-xl flex items-center justify-center text-white font-black italic shadow-lg shadow-brand-blue/20 text-sm">
        {index + 1}
      </div>
      
      <input
        type="text"
        value={exercise.name}
        onChange={(e) => onUpdate(exercise.id, 'name', e.target.value)}
        placeholder="Напр. Отжимания"
        className="flex-1 bg-transparent text-text-primary font-bold focus:outline-none placeholder:text-text-muted/30 placeholder:font-medium transition-colors"
      />

      <TimerInput 
        value={exercise.duration} 
        onChange={(val) => onUpdate(exercise.id, 'duration', val)} 
      />

      <button
        type="button"
        onClick={() => onRemove(exercise.id)}
        className="cursor-pointer p-2 text-text-muted hover:text-brand-rose transition-all active:scale-110"
        title="Удалить"
      >
        <Trash2 size={18} className="sm:w-5 sm:h-5" />
      </button>
    </div>
  );
};
