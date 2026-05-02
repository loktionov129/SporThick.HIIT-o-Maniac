import React from 'react';
import { NavLink } from 'react-router-dom';
import { Pencil, Trash2, Play, Activity, ListChecks, Timer } from 'lucide-react';
import { type Workout } from '../../../types';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { formatDuration } from '../../../utils/formatters';

interface WorkoutCardProps {
  workout: Workout;
  onDelete: (id: string) => void;
  isDragging?: boolean;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ 
  workout, 
  onDelete,
  isDragging 
}) => {
  const totalSeconds = workout.exercises.reduce((acc, ex) => acc + ex.duration, 0) + 
                       (workout.restDuration * (workout.exercises.length - 1));
  const totalWorkoutTime = totalSeconds * workout.rounds;

  return (
    <Card 
      className={`relative overflow-hidden border-none transition-all ${
        isDragging ? 'rotate-2 scale-105 shadow-2xl z-50 opacity-90' : ''
      }`}
    >
      {/* Фоновый декор */}
      <Activity 
        size={140} 
        className="absolute -right-8 -top-8 text-text-primary/5 -rotate-12 pointer-events-none" 
      />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Инфо-блок */}
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-text-primary leading-none truncate">
              {workout.name}
            </h3>
            
            {/* Группа тегов */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1 bg-brand-blue/10 px-2 py-1 rounded-lg border border-brand-blue/10">
                <Timer size={10} className="text-brand-blue" />
                <span className="text-[9px] font-black text-brand-blue uppercase tracking-widest">
                  {formatDuration(totalWorkoutTime)}
                </span>
              </div>
              <div className="flex items-center gap-1 bg-surface-accent px-2 py-1 rounded-lg border border-text-primary/5">
                <ListChecks size={10} className="text-text-muted" />
                <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">
                  {workout.exercises.length}
                </span>
              </div>
            </div>
          </div>
          
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.15em] italic leading-tight line-clamp-1 opacity-60 pr-10">
            {workout.exercises.length > 0 
              ? workout.exercises.map((ex) => ex.name).join(' • ')
              : 'Программа пуста'}
          </p>
        </div>

        {/* ПАНЕЛЬ ДЕЙСТВИЙ: START (Primary), EDIT (Secondary), DELETE (Danger) */}
        <div className="flex items-center gap-2">
          {/* Начать — самое крупное действие */}
          <NavLink to={`/timer?workoutId=${workout.id}`} className="flex-1">
            <Button 
              variant="primary" 
              fullWidth
              className="gap-3 py-4 shadow-lg shadow-brand-blue/20"
            >
              <Play size={18} fill="currentColor" />
              <span className="text-xs font-black uppercase italic tracking-widest leading-none">СТАРТ</span>
            </Button>
          </NavLink>

          {/* Редактировать — вторичное */}
          <NavLink to={`/create-edit-workout?workoutId=${workout.id}`}>
            <Button 
              variant="secondary" 
              className="!size-14 !p-0 shadow-sm"
              title="Редактировать"
            >
              <Pencil size={20} />
            </Button>
          </NavLink>

          {/* Удалить — опасное */}
          <Button 
            variant="danger" 
            onClick={() => onDelete(workout.id)}
            className="!size-14 !p-0 shadow-sm"
            title="Удалить"
          >
            <Trash2 size={20} />
          </Button>
        </div>
      </div>
    </Card>
  );
};
