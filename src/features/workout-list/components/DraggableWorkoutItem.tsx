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
          className={`relative flex items-center gap-1 sm:gap-2 transition-all duration-300 ${
            snapshot.isDragging 
              ? 'z-50 scale-[1.03] rotate-2 shadow-2xl shadow-brand-blue/20' 
              : ''
          }`}
        >
          {!isDragDisabled && (
            <div 
              {...provided.dragHandleProps} 
              className={`p-2 transition-colors duration-200 cursor-grab active:cursor-grabbing ${
                snapshot.isDragging ? 'text-brand-blue' : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <GripVertical size={20} />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
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
