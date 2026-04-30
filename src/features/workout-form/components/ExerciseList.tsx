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
            className="space-y-4"
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
                    className={`flex items-center gap-1 sm:gap-2 transition-all duration-300 ${
                      snapshot.isDragging 
                        ? 'z-50 scale-[1.03] rotate-1' 
                        : 'opacity-100'
                    }`}
                  >
                    <div 
                      {...provided.dragHandleProps} 
                      className={`p-2 transition-colors duration-200 ${
                        snapshot.isDragging 
                          ? 'text-brand-blue' 
                          : 'text-text-muted hover:text-text-primary'
                      } cursor-grab active:cursor-grabbing`}
                    >
                      <GripVertical size={20} />
                    </div>

                    <div className={`flex-1 min-w-0 transition-shadow duration-300 ${
                      snapshot.isDragging ? 'shadow-2xl shadow-brand-blue/10' : ''
                    }`}>
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
