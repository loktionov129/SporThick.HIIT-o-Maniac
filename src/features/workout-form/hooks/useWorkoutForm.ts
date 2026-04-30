import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import type { DropResult } from '@hello-pangea/dnd';
import { useWorkoutActions } from '../../../store/useWorkoutStore';
import type { Exercise, Workout } from '../../../types';

export const useWorkoutForm = (currentWorkout: Workout | null | undefined) => {
  const navigate = useNavigate();
  const { addWorkout, updateWorkout } = useWorkoutActions();

  const [name, setName] = useState(currentWorkout?.name || '');
  const [rounds, setRounds] = useState(currentWorkout?.rounds || 1);
  const [restDuration, setRestDuration] = useState(currentWorkout?.restDuration || 0);
  const [exercises, setExercises] = useState<Exercise[]>(
    currentWorkout?.exercises || [{ id: Date.now().toString(), name: '', duration: 30 }]
  );

  const addExercise = () => {
    setExercises(prev => [...prev, { id: Date.now().toString(), name: '', duration: 30 }]);
  };

  const removeExercise = (id: string) => {
    setExercises(prev => prev.filter(ex => ex.id !== id));
  };

  const updateExercise = (id: string, field: 'name' | 'duration', value: string | number) => {
    setExercises(prev => prev.map(ex => ex.id === id ? { ...ex, [field]: value } : ex));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = [...exercises];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setExercises(items);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const workoutData = {
      name,
      exercises: exercises.filter(ex => ex.name.trim() !== ''),
      rounds,
      restDuration,
    };

    if (currentWorkout?.id) updateWorkout(currentWorkout.id, workoutData);
    else addWorkout({ id: Date.now().toString(), ...workoutData });

    navigate('/');
  };

  return {
    state: { name, rounds, restDuration, exercises },
    controls: { setName, setRounds, setRestDuration, addExercise, removeExercise, updateExercise, onDragEnd, handleSubmit }
  };
};
