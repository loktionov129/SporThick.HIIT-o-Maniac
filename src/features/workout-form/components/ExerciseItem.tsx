import React from 'react';
import { Trash2 } from 'lucide-react';
import { type Exercise } from '../../../types';
import { TimerInput } from '../../../components/ui/TimerInput';

interface ExerciseItemProps {
  exercise: Exercise;
  index: number;
  onUpdate: (id: string, field: 'name' | 'duration', value: string | number) => void;
  onRemove: (id: string) => void;
}

export const ExerciseItem: React.FC<ExerciseItemProps> = ({ exercise, index, onUpdate, onRemove }) => {
  return (
    <div className="">
      
      <div className="">
        {index + 1}
      </div>
      
      <input
        type="text"
        value={exercise.name}
        onChange={(e) => onUpdate(exercise.id, 'name', e.target.value)}
        placeholder="Напр. Отжимания"
        className=""
      />

      <TimerInput 
        value={exercise.duration} 
        onChange={(val) => onUpdate(exercise.id, 'duration', val)} 
      />

      <button
        type="button"
        onClick={() => onRemove(exercise.id)}
        className=""
        title="Удалить"
      >
        <Trash2 size={18} className="" />
      </button>
    </div>
  );
};
