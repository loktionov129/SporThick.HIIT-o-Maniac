import React from 'react';
import { Pencil, Trash2, Play, ChevronRight } from 'lucide-react';
import { type Workout } from '../../../types';
import { Card } from '../../../components/ui/Card';

interface WorkoutCardProps {
  workout: Workout;
  onStart: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onStart, onEdit, onDelete }) => {
  return (
    <Card 
      onClick={() => onStart(workout.id)} 
      className="group relative"
    >
      <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-blue-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-slate-100 truncate group-hover:text-blue-400 transition-colors">
              {workout.name}
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-bold uppercase tracking-wider">
              {workout.exercises.length} упр.
            </span>
          </div>
          
          <p className="text-sm text-slate-500 line-clamp-1 italic font-light">
            {workout.exercises.length > 0 
              ? workout.exercises.map((ex) => ex.name).join(' • ')
              : 'Упражнений нет'}
          </p>

          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center text-[11px] font-black text-blue-500 uppercase tracking-[0.15em]">
              <Play size={14} className="mr-1.5 fill-current" />
              Старт
            </div>
            <ChevronRight size={14} className="text-slate-700 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(workout.id); }}
            className="cursor-pointer p-3 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all active:scale-90"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(workout.id); }}
            className="cursor-pointer p-3 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all active:scale-90"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </Card>
  );
};
