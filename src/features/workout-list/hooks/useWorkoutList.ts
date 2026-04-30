import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkoutStore, useWorkoutActions } from '../../../store/useWorkoutStore';
import type { DropResult } from '@hello-pangea/dnd';

export const useWorkoutList = () => {
  const navigate = useNavigate();
  const { workouts } = useWorkoutStore();
  const { reorderWorkouts, deleteWorkout } = useWorkoutActions();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWorkouts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return workouts;

    return workouts.filter((w) => 
      w.name.toLowerCase().includes(query) || 
      w.exercises.some(e => e.name.toLowerCase().includes(query))
    );
  }, [workouts, searchQuery]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    reorderWorkouts(result.source.index, result.destination.index);
  };

  const actions = {
    start: (id: string) => navigate(`/timer?workoutId=${id}`),
    edit: (id: string) => navigate(`/create-edit-workout?workoutId=${id}`),
    create: () => navigate('/create-edit-workout'),
    delete: (id: string) => {
      if (window.confirm('Удалить эту тренировку?')) deleteWorkout(id);
    }
  };

  return {
    workouts: filteredWorkouts,
    totalCount: workouts.length,
    searchQuery,
    setSearchQuery,
    handleDragEnd,
    actions,
    isSearchActive: searchQuery.length > 0
  };
};
