import React from 'react';
import { Trash2, Clock } from 'lucide-react';
import { type Exercise } from '../../../types';

interface ExerciseItemProps {
  exercise: Exercise;
  index: number;
  onUpdate: (id: string, field: 'name' | 'duration', value: string | number) => void;
  onRemove: (id: string) => void;
}

export const ExerciseItem: React.FC<ExerciseItemProps> = ({ exercise, index, onUpdate, onRemove }) => {
  return (
    <div className="group bg-slate-900/50 border border-slate-800 p-4 rounded-2xl flex items-center gap-4 transition-all focus-within:border-blue-500/30 focus-within:bg-slate-900">
      <div className="flex-shrink-0 w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-blue-500 font-black italic shadow-inner group-focus-within:bg-blue-500 group-focus-within:text-white transition-colors">
        {index + 1}
      </div>
      
      <input
        type="text"
        value={exercise.name}
        onChange={(e) => onUpdate(exercise.id, 'name', e.target.value)}
        placeholder="Название упражнения"
        className="flex-1 bg-transparent text-white font-semibold focus:outline-none placeholder:text-slate-700"
      />

      <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-2 rounded-xl border border-transparent focus-within:border-slate-700 transition-colors">
        <Clock size={14} className="text-slate-500" />
        <input
          type="number"
          value={exercise.duration}
          onChange={(e) => onUpdate(exercise.id, 'duration', parseInt(e.target.value) || 0)}
          className="w-10 bg-transparent text-white text-sm font-bold focus:outline-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <span className="text-[10px] text-slate-500 font-bold uppercase">s</span>
      </div>

      <button
        type="button"
        onClick={() => onRemove(exercise.id)}
        className="cursor-pointer p-2 text-slate-600 hover:text-red-500 transition-colors active:scale-90"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};
