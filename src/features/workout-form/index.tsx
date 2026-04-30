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

export const CreateEditWorkoutScreen: React.FC = () => {
  const [searchParams] = useSearchParams();
  const workoutId = searchParams.get('workoutId');
  
  const currentWorkout = useWorkoutStore(s => 
    workoutId ? s.workouts.find(w => w.id === workoutId) : null
  );

  const { state, controls } = useWorkoutForm(currentWorkout as any);

  return (
    <div className="pb-32 animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out">
      <WorkoutFormHeader isEdit={!!workoutId} />

      <form onSubmit={controls.handleSubmit} className="space-y-8 md:space-y-10">
        <WorkoutNameInput value={state.name} onChange={controls.setName} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          <ConfigCard label="Раунды" subLabel="Круги упражнений">
            <PlusMinusInput min={1} value={state.rounds} onChange={controls.setRounds} />
          </ConfigCard>
          
          <ConfigCard label="Отдых" subLabel="Между упр-ми">
            <TimerInput value={state.restDuration} onChange={controls.setRestDuration} />
          </ConfigCard>
        </div>

        <div className="pt-2">
          <ExerciseSection 
            exercises={state.exercises}
            onAdd={controls.addExercise}
            onRemove={controls.removeExercise}
            onUpdate={controls.updateExercise}
            onDragEnd={controls.onDragEnd}
          />
        </div>

        <FormFooterActions onCancel={() => window.history.back()} />
      </form>
    </div>
  );
};
