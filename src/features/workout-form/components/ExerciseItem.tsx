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
    <div className="group bg-[#0b1224]/50 border border-slate-800/60 p-4 rounded-2xl flex items-center gap-4 transition-all focus-within:border-blue-500/30">
      
      <div className="flex-shrink-0 w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black italic shadow-lg shadow-blue-600/20">
        {index + 1}
      </div>
      
      <input
        type="text"
        value={exercise.name}
        onChange={(e) => onUpdate(exercise.id, 'name', e.target.value)}
        placeholder="Напр. Анжуманя"
        className="flex-1 bg-transparent text-white font-bold focus:outline-none placeholder:text-slate-800"
      />

      <TimerInput 
        value={exercise.duration} 
        onChange={(val) => onUpdate(exercise.id, 'duration', val)} 
      />

      <button
        type="button"
        onClick={() => onRemove(exercise.id)}
        className="cursor-pointer p-2 text-slate-700 hover:text-red-500 transition-colors active:scale-90"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};
