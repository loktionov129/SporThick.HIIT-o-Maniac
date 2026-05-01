import React from 'react';
import { Pencil, Trash2, Play, ChevronRight } from 'lucide-react';
import { type Workout } from '../../../types';
import { Card } from '../../../components/ui/Card';

interface WorkoutCardProps {
  workout: Workout;
  onStart: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isDragging?: boolean;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ 
  workout, 
  onStart, 
  onEdit, 
  onDelete,
  isDragging 
}) => {
  return (
    <Card 
      onClick={() => onStart(workout.id)} 
      className=""
    >
      <div className="" />

      <div className="">
        <div className="">
          <div className="">
            <h3 className="">
              {workout.name}
            </h3>
            <span className="">
              {workout.exercises.length} упр.
            </span>
          </div>
          
          <p className="">
            {workout.exercises.length > 0 
              ? workout.exercises.map((ex) => ex.name).join(' • ')
              : 'Программа пуста'}
          </p>

          <div className="">
            <div className="">
              <Play size={12} className="" />
              Начать сессию
            </div>
            <ChevronRight size={14} className="" />
          </div>
        </div>

        <div className="">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(workout.id); }}
            className=""
            title="Редактировать"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(workout.id); }}
            className=""
            title="Удалить"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </Card>
  );
};
