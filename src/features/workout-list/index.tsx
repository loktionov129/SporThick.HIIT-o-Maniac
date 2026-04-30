import React from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { EmptyWorkouts } from './components/EmptyWorkouts';
import { SearchHeader } from './components/SearchHeader';
import { DraggableWorkoutItem } from './components/DraggableWorkoutItem';
import { useWorkoutList } from './hooks/useWorkoutList';

export const WorkoutList: React.FC = () => {
  const { 
    workouts, 
    totalCount, 
    searchQuery, 
    setSearchQuery, 
    handleDragEnd, 
    actions,
    isSearchActive 
  } = useWorkoutList();

  if (totalCount === 0) {
    return <EmptyWorkouts />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <SearchHeader 
        query={searchQuery} 
        onQueryChange={setSearchQuery} 
        onCreate={actions.create} 
      />

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="workouts-list">
          {(provided) => (
            <div 
              {...provided.droppableProps} 
              ref={provided.innerRef} 
              className="grid gap-4"
            >
              {workouts.map((workout, index) => (
                <DraggableWorkoutItem
                  key={workout.id}
                  workout={workout}
                  index={index}
                  isDragDisabled={isSearchActive}
                  actions={actions}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
