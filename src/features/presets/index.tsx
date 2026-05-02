import React from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import type { PresetWorkout } from '@app-types/index';
import { PRESET_WORKOUTS } from '@constants/presets';
import { useToastStore } from '@store/useToastStore';
import { useWorkoutActions } from '@store/useWorkoutStore';
import { Button } from '@ui/Button';
import { WorkoutCard } from '../workout-list/components/WorkoutCard';

export const PresetsScreen: React.FC = () => {
  const { addWorkout } = useWorkoutActions();
  const showToast = useToastStore((s) => s.showToast);
  const navigate = useNavigate();

  const handleAdd = (preset: PresetWorkout) => {
    const id = crypto.randomUUID();
    addWorkout({ ...preset, id });
    showToast(`${preset.name} добавлен!`, 'success');
    navigate(`/workout/edit?workoutId=${id}`);
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="flex items-center gap-5 px-2">
        <NavLink to="/">
          <Button 
            variant="secondary" 
            className="!size-12 !p-0 rounded-2xl bg-surface-card border-none shadow-sm active:scale-90"
          >
            <ArrowLeft size={24} className="text-text-primary" />
          </Button>
        </NavLink>
        
        <div className="flex flex-col">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-text-primary leading-none">
            Шаблоны
          </h2>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="size-1.5 bg-brand-blue rounded-full animate-pulse" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">
              Библиотека HIIT
            </p>
          </div>
        </div>
      </div>

      <div className="h-4 flex items-center justify-center">
        <p className="text-[8px] font-black uppercase tracking-[0.4em] 
                text-brand-blue/80 leading-none italic">
          Нажми на плюсик, чтобы добавить тренировку
        </p>
      </div>


      {/* GRID: Список шаблонов */}
      <div className="flex flex-col gap-4">
        {PRESET_WORKOUTS.map((preset) => (
          <WorkoutCard
            key={preset.name}
            workout={preset}
            headerBadge={
              <div onClick={() => handleAdd(preset)} className="cursor-pointer size-10 bg-brand-blue rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-blue/20">
                <Plus size={22} strokeWidth={3} />
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};
