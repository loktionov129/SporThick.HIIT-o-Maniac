import React from 'react';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { GripVertical } from 'lucide-react';
import type { Exercise } from '@app-types/index';
import { ExerciseItem } from './ExerciseItem';

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
            className="flex flex-col gap-3"
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
                    className={`flex items-center gap-1 relative group transition-all ${
                      snapshot.isDragging ? 'z-50' : 'z-0'
                    }`}
                  >
                    {/* ЗОНА ЗАХВАТА (GRIP) */}
                    <div 
                      {...provided.dragHandleProps} 
                      className={`
                        flex items-center justify-center
                        w-10 h-16 -mr-1 z-20 shrink-0
                        text-text-muted/20 hover:text-brand-blue 
                        active:text-brand-blue transition-colors
                        cursor-grab active:cursor-grabbing
                      `}
                      title="Перетащить"
                    >
                      <GripVertical size={20} strokeWidth={2.5} />
                    </div>

                    {/* КАРТОЧКА УПРАЖНЕНИЯ */}
                    <div className="flex-1 min-w-0">
                      <ExerciseItem
                        exercise={exercise}
                        onUpdate={onUpdate}
                        onRemove={onRemove}
                        isDragging={snapshot.isDragging}
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
