import React from 'react';
import { Pencil, Trash2, Play, ChevronRight } from 'lucide-react';
import { type Workout } from '../../../types';
import { Card } from '../../../components/ui/Card';

interface WorkoutCardProps {
  workout: Workout;
  onStart: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isDragging?: boolean;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ 
  workout, 
  onStart, 
  onEdit, 
  onDelete,
  isDragging 
}) => {
  return (
    <Card 
      onClick={() => onStart(workout.id)} 
      className={`group relative overflow-hidden transition-all duration-300 ${
        isDragging ? 'border-brand-blue/50 ring-4 ring-brand-blue/5' : 'border-text-muted/10'
      }`}
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-blue transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />

      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-black text-text-primary truncate group-hover:text-brand-blue transition-colors italic uppercase tracking-tight">
              {workout.name}
            </h3>
            <span className="text-[9px] px-2 py-0.5 rounded-lg bg-surface-accent text-text-muted font-black uppercase tracking-widest border border-text-muted/5">
              {workout.exercises.length} упр.
            </span>
          </div>
          
          <p className="text-[11px] text-text-muted line-clamp-1 italic font-medium opacity-60">
            {workout.exercises.length > 0 
              ? workout.exercises.map((ex) => ex.name).join(' • ')
              : 'Программа пуста'}
          </p>

          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center text-[10px] font-black text-brand-blue uppercase tracking-[0.2em] italic">
              <Play size={12} className="mr-2 fill-current" />
              Начать сессию
            </div>
            <ChevronRight size={14} className="text-text-muted/40 group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
          </div>
        </div>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(workout.id); }}
            className="cursor-pointer p-3 text-text-muted hover:text-brand-blue hover:bg-brand-blue/10 rounded-2xl transition-all active:scale-90"
            title="Редактировать"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(workout.id); }}
            className="cursor-pointer p-3 text-text-muted hover:text-brand-rose hover:bg-brand-rose/10 rounded-2xl transition-all active:scale-90"
            title="Удалить"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </Card>
  );
};
