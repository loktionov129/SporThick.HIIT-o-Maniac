import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import { TimerInput } from '../../components/ui/TimerInput';
import { PlusMinusInput } from '../../components/ui/PlusMinusInput';
import { useWorkoutForm } from './hooks/useWorkoutForm';
import { ConfigCard } from './components/ConfigCard';
import { ExerciseSection } from './components/ExerciseSection';
import { FormFooterActions } from './components/FormFooterActions';
import { WorkoutFormHeader } from './components/WorkoutFormHeader';
import { WorkoutNameInput } from './components/WorkoutNameInput';
import { PresetsButton } from '../presets/components/PresetsButton';
import type { Workout } from '../../types';

export const CreateEditWorkoutScreen: React.FC = () => {
  const [searchParams] = useSearchParams();
  const workoutId = searchParams.get('workoutId');
  const currentWorkout = useWorkoutStore(s => 
    workoutId ? s.workouts.find(w => w.id === workoutId) : null
  );
  const { state, controls } = useWorkoutForm(currentWorkout as Workout);

  return (
    <div className="max-w-md mx-auto w-full min-h-screen bg-surface-main animate-in fade-in slide-in-from-bottom-4 duration-500">
      <form 
        onSubmit={controls.handleSubmit} 
        className="flex flex-col min-h-screen"
      >
        <WorkoutFormHeader isEdit={!!workoutId} />
        <main className="flex-1 px-4 overflow-y-auto">
          {!workoutId && (
            <div className="mb-10 space-y-6">
              <PresetsButton />
              
              <div className="relative flex items-center justify-center py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-text-primary/5"></div>
                </div>
                <span className="relative px-4 bg-surface-main text-[9px] font-black uppercase tracking-[0.3em] text-text-muted/50 italic">
                  Или собери вручную
                </span>
              </div>
            </div>
          )}
          <div className="space-y-10 pb-10">
            <WorkoutNameInput value={state.name} onChange={controls.setName} />
            <div className="grid grid-cols-2 gap-4">
              <ConfigCard label="Круги" subLabel="Кол-во повторов">
                <PlusMinusInput min={1} value={state.rounds} onChange={controls.setRounds} />
              </ConfigCard>
              <ConfigCard label="Отдых" subLabel="Между упр.">
                <TimerInput value={state.restDuration} onChange={controls.setRestDuration} />
              </ConfigCard>
            </div>

            <ExerciseSection 
              exercises={state.exercises}
              onAdd={controls.addExercise}
              onRemove={controls.removeExercise}
              onUpdate={controls.updateExercise}
              onDragEnd={controls.onDragEnd}
            />
          </div>
        </main>
        <FormFooterActions />
      </form>
    </div>
  );
};
