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

export const CreateEditWorkoutScreen: React.FC = () => {
  const [searchParams] = useSearchParams();
  const workoutId = searchParams.get('workoutId');
  const currentWorkout = useWorkoutStore(s => 
    workoutId ? s.workouts.find(w => w.id === workoutId) : null
  );
  const { state, controls } = useWorkoutForm(currentWorkout as any);

  return (
    <div className="">
      <WorkoutFormHeader isEdit={!!workoutId} />

      {!workoutId && (
        <div className="">
          <PresetsButton />
          
          <div className="">
            <div className="" aria-hidden="true">
              <div className=""></div>
            </div>
            <div className="">
              <span className="">Или создай свою</span>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={controls.handleSubmit} className="">
        <WorkoutNameInput value={state.name} onChange={controls.setName} />

        <div className="">
          <ConfigCard label="Раунды" subLabel="Круги упражнений">
            <PlusMinusInput min={1} value={state.rounds} onChange={controls.setRounds} />
          </ConfigCard>
          
          <ConfigCard label="Отдых" subLabel="Между упр-ми">
            <TimerInput value={state.restDuration} onChange={controls.setRestDuration} />
          </ConfigCard>
        </div>

        <div className="">
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
