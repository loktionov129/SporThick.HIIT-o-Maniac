import React from 'react';
import { Activity } from 'lucide-react';
import type { PresetWorkout } from '../../../types';
import { Card } from '../../../components/ui/Card';
import { WorkoutDashboard } from './WorkoutDashboard';

interface WorkoutCardProps {
  workout: PresetWorkout;
  actions?: React.ReactNode;
  headerBadge?: React.ReactNode;
  onClick?: () => void;
  isDragging?: boolean;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ 
  workout, 
  actions, 
  headerBadge,
  isDragging 
}) => {
  return (
    <Card 
      className={`
        relative overflow-hidden transition-all p-6
        bg-surface-card border border-text-primary/5 shadow-xl
        ${isDragging ? 'rotate-2 scale-105 z-50 opacity-90 shadow-2xl' : ''}
      `}
    >
      {/* Универсальный водяной знак */}
      <Activity size={140} className="absolute -right-8 -top-8 text-text-primary/5 -rotate-12 pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-6">
        {/* HEADER: Название + Гибкий бейдж */}
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-3xl font-black italic uppercase tracking-tighter text-text-primary leading-none truncate">
            {workout.name}
          </h3>
          {headerBadge}
        </div>

        <WorkoutDashboard workout={workout} />
        
        {/* EXERCISES (Теги) */}
        <div className="flex flex-wrap gap-1.5 px-1">
          {workout.exercises.slice(0, 4).map((ex) => (
            <div key={ex.id} className="flex items-center gap-1.5 bg-surface-accent/50 px-2.5 py-1 rounded-lg border border-text-primary/5">
              <Activity size={10} className="text-brand-blue/40" />
              <span className="text-[9px] font-bold uppercase text-text-muted italic">{ex.name}</span>
            </div>
          ))}
          {workout.exercises.length > 4 && (
            <span className="text-[9px] font-black text-text-muted/40 self-center ml-1">
              +{workout.exercises.length - 4}
            </span>
          )}
        </div>

        {/* SLOT: ACTIONS */}
        {actions && (
          <div className="pt-2">
            {actions}
          </div>
        )}
      </div>
    </Card>
  );
};
