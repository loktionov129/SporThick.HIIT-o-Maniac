import { useState, useMemo } from 'react';
import type { DropResult } from '@hello-pangea/dnd';
import { useModalStore } from '@store/useModalStore';
import { useToastStore } from '@store/useToastStore';
import { useWorkoutStore, useWorkoutActions } from '@store/useWorkoutStore';

export const useWorkoutList = () => {
  const { workouts } = useWorkoutStore();
  const { reorderWorkouts, deleteWorkout } = useWorkoutActions();
  const [searchQuery, setSearchQuery] = useState('');
  const showToast = useToastStore((s) => s.showToast);
  const openModal = useModalStore(s => s.openModal);

  const filteredWorkouts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      return workouts;
    }

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
    delete: (id: string) => {
      openModal({
        title: "Удалить?",
        message: "Эта тренировка исчезнет навсегда. Ты уверен?",
        confirmText: "Удалить",
        variant: "primary",
        onConfirm: () => {
          deleteWorkout(id);
          showToast('Тренировка удалена', 'info');
        },
      });
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
