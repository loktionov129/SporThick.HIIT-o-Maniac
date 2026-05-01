import React from 'react';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { GripVertical } from 'lucide-react';
import { ExerciseItem } from './ExerciseItem';
import type { Exercise } from '../../../types';

interface ExerciseListProps {
  exercises: Exercise[];
  onDragEnd: (result: DropResult) => void;
  onUpdate: (id: string, field: 'name' | 'duration', value: string | number) => void;
  onRemove: (id: string) => void;
}

export const ExerciseList: React.FC<ExerciseListProps> = ({ 
  exercises, 
  onDragEnd, 
  onUpdate, 
  onRemove 
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="exercises-list">
        {(provided) => (
          <div 
            {...provided.droppableProps} 
            ref={provided.innerRef} 
            className=""
          >
            {exercises.map((exercise, index) => (
              <Draggable 
                key={exercise.id} 
                draggableId={exercise.id} 
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className=""
                  >
                    <div 
                      {...provided.dragHandleProps} 
                      className=""
                    >
                      <GripVertical size={20} />
                    </div>

                    <div className="">
                      <ExerciseItem
                        index={index}
                        exercise={exercise}
                        onUpdate={onUpdate}
                        onRemove={onRemove}
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
  );
};
