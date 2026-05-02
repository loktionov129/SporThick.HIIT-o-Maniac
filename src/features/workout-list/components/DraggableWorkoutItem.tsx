import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { GripVertical } from 'lucide-react';
import { WorkoutCard } from './WorkoutCard';
import type { Workout } from '../../../types';
import { WorkoutActions } from './WorkoutActions';
import { WorkoutIntensityBadge } from './WorkoutIntensityBadge';

interface DraggableWorkoutItemProps {
  workout: Workout;
  index: number;
  isDragDisabled: boolean;
  actions: {
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
    <Draggable draggableId={workout.id} index={index} isDragDisabled={isDragDisabled}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`flex items-center gap-1 relative transition-all duration-300 ${
            snapshot.isDragging ? 'z-50 scale-[1.03]' : 'z-0'
          }`}
        >
          <div 
            {...provided.dragHandleProps} 
            className={`
              flex items-center justify-center
              w-12 h-24 -mr-2 z-20 shrink-0
              transition-all duration-300
              ${isDragDisabled 
                ? 'opacity-0 pointer-events-none' 
                : 'text-text-muted/40 hover:text-brand-blue cursor-grab active:cursor-grabbing'}
            `}
          >
            <GripVertical size={28} strokeWidth={3} />
          </div>
          
          <div className="flex-1 min-w-0">
            <WorkoutCard
              workout={workout}
              isDragging={snapshot.isDragging}
              headerBadge={<WorkoutIntensityBadge intensity={workout.intensity} />}
              actions={<WorkoutActions id={workout.id} onDelete={actions.delete} />}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};
