import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { GripVertical } from 'lucide-react';
import { WorkoutCard } from './WorkoutCard';
import type { Workout } from '../../../types';

interface DraggableWorkoutItemProps {
  workout: Workout;
  index: number;
  isDragDisabled: boolean;
  actions: {
    start: (id: string) => void;
    edit: (id: string) => void;
    delete: (id: string) => void;
  };
}

export const DraggableWorkoutItem: React.FC<DraggableWorkoutItemProps> = ({
  workout,
  index,
  isDragDisabled,
  actions,
}) => {
  return (
    <Draggable 
      draggableId={workout.id} 
      index={index} 
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className=""
        >
          {!isDragDisabled && (
            <div 
              {...provided.dragHandleProps} 
              className=""
            >
              <GripVertical size={20} />
            </div>
          )}
          
          <div className="">
            <WorkoutCard
              workout={workout}
              onStart={actions.start}
              onEdit={actions.edit}
              onDelete={actions.delete}
              isDragging={snapshot.isDragging}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};
