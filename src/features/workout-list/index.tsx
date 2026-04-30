import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { Search, GripVertical } from 'lucide-react';
import useWorkoutStore from '../../store/useWorkoutStore';
import { WorkoutCard } from './components/WorkoutCard';
import { EmptyWorkouts } from './components/EmptyWorkouts';
import { Input } from '../../components/ui/Input';

export const WorkoutList: React.FC = () => {
  const { workouts, reorderWorkouts, deleteWorkout } = useWorkoutStore();
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
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
        <Input
          placeholder="Поиск тренировки..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12"
        />
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
                          key={workout.id}
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

export default WorkoutList;
