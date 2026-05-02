import React from 'react';
import { Trash2 } from 'lucide-react';
import { type Exercise } from '../../../types';
import { TimerInput } from '../../../components/ui/TimerInput';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

interface ExerciseItemProps {
  exercise: Exercise;
  onUpdate: (id: string, field: 'name' | 'duration', value: string | number) => void;
  onRemove: (id: string) => void;
  isDragging?: boolean;
}

export const ExerciseItem: React.FC<ExerciseItemProps> = ({ 
  exercise, onUpdate, onRemove, isDragging 
}) => {
  return (
    <div className={`
      flex items-center gap-4 p-3 pl-6 rounded-2xl transition-all duration-300
      bg-surface-card border border-text-primary/5
      ${isDragging ? 'z-50 scale-[1.02] shadow-2xl border-brand-blue/30 bg-surface-accent/60' : ''}
    `}>
      
      <div className="flex-1 min-w-0">
        <Input
          value={exercise.name}
          onChange={(e) => onUpdate(exercise.id, 'name', e.target.value)}
          placeholder="Упражнение..."
          className="!bg-transparent !border-none !p-0 !h-auto text-xl font-black italic uppercase tracking-tighter text-text-primary shadow-none truncate"
        />
      </div>

      <div className="w-32 shrink-0">
        <TimerInput 
          value={exercise.duration} 
          onChange={(val) => onUpdate(exercise.id, 'duration', val)} 
        />
      </div>

      <Button
        type="button"
        variant="danger"
        onClick={() => onRemove(exercise.id)}
        className="!p-2 text-text-muted/20 hover:text-brand-rose transition-colors shrink-0"
      >
        <Trash2 size={18} />
      </Button>
    </div>
  );
};
