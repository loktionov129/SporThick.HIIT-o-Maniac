import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { Search, GripVertical, Plus } from 'lucide-react';
import { useWorkoutStore, useWorkoutActions } from '../../store/useWorkoutStore';
import { WorkoutCard } from './components/WorkoutCard';
import { EmptyWorkouts } from './components/EmptyWorkouts';
import { Input } from '../../components/ui/Input';

export const WorkoutList: React.FC = () => {
  const { workouts } = useWorkoutStore();
  const { reorderWorkouts, deleteWorkout } = useWorkoutActions();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredWorkouts = useMemo(() => {
    return workouts.filter((w) => {
      const query = searchQuery.toLowerCase();
      return w.name.toLowerCase().includes(query)
       || w.exercises.some(e => e.name.toLowerCase().includes(query));
    });
  }, [workouts, searchQuery]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    reorderWorkouts(result.source.index, result.destination.index);
  };

  const handleStart = (id: string) => navigate(`/timer?workoutId=${id}`);
  const handleEdit = (id: string) => navigate(`/create-edit-workout?workoutId=${id}`);
  const handleDelete = (id: string) => {
    if (confirm('Удалить эту тренировку?')) deleteWorkout(id);
  };

  if (workouts.length === 0) {
    return <EmptyWorkouts />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <Input
            placeholder="Поиск тренировки..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 py-6"
          />
        </div>

        <button 
          onClick={() => navigate('/create-edit-workout')}
          className="cursor-pointer group flex items-center justify-center bg-white text-slate-950 px-5 rounded-2xl transition-all duration-300 hover:bg-blue-50 hover:scale-[1.02] active:scale-95 shadow-xl shadow-white/5"
          title="Создать тренировку"
        >
          <Plus size={24} className="group-hover:rotate-90 transition-transform duration-500" />
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="workouts-list">
          {(provided) => (
            <div 
              {...provided.droppableProps} 
              ref={provided.innerRef} 
              className="grid gap-4"
            >
              {filteredWorkouts.map((workout, index) => (
                <Draggable 
                  key={workout.id} 
                  draggableId={workout.id} 
                  index={index}
                  isDragDisabled={searchQuery.length > 0} 
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`relative flex items-center gap-2 ${
                        snapshot.isDragging ? 'z-50' : ''
                      }`}
                    >
                      {!searchQuery && (
                        <div 
                          {...provided.dragHandleProps} 
                          className="text-slate-600 hover:text-slate-400 cursor-grab active:cursor-grabbing p-1"
                        >
                          <GripVertical size={20} />
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <WorkoutCard
                          workout={workout}
                          onStart={handleStart}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
