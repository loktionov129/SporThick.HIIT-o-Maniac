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
                    className={`flex items-center gap-2 transition-shadow ${
                      snapshot.isDragging ? 'z-50 shadow-2xl scale-[1.02]' : ''
                    }`}
                  >
                    <div 
                      {...provided.dragHandleProps} 
                      className="p-2 text-slate-700 hover:text-slate-500 cursor-grab active:cursor-grabbing transition-colors"
                    >
                      <GripVertical size={20} />
                    </div>

                    <div className="flex-1 min-w-0">
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
