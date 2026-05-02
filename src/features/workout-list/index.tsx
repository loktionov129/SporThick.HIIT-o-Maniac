import React from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { EmptyWorkouts } from './components/EmptyWorkouts';
import { SearchHeader } from './components/SearchHeader';
import { DraggableWorkoutItem } from './components/DraggableWorkoutItem';
import { useWorkoutList } from './hooks/useWorkoutList';
import { WorkoutSection } from './components/WorkoutSection';
import { WorkoutFooter } from './components/WorkoutFooter';

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

  if (totalCount === 0) return <EmptyWorkouts />;

  return (
    <div className="flex flex-col gap-8 pb-12">
      <SearchHeader 
        query={searchQuery} 
        onQueryChange={setSearchQuery} 
        onCreate={actions.create} 
      />

      <WorkoutSection 
        title={isSearchActive ? 'Результаты поиска' : 'Твои программы'} 
        count={workouts.length}
      >
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="workouts-list">
            {(provided) => (
              <div 
                {...provided.droppableProps} 
                ref={provided.innerRef} 
                className="flex flex-col gap-4 min-h-[50px]"
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
      </WorkoutSection>

      <WorkoutFooter showHint={workouts.length > 1 && !isSearchActive} />
    </div>
  );
};
