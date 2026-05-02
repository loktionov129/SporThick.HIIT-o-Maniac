import React from 'react';
import { Input } from '@ui/Input';

interface WorkoutNameInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const WorkoutNameInput: React.FC<WorkoutNameInputProps> = ({ value, onChange }) => {
  return (
    <section className="space-y-4 px-2 mb-10 group">
      <div className="flex items-center gap-2 ml-1">
        <div className="size-1 bg-brand-blue rounded-full" />
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-text-primary/60 dark:text-text-muted italic leading-none">
          Название тренировки
        </label>
      </div>
      
      <div className="relative">
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Напр. Взрывной HIIT"
          className="text-2xl font-black italic uppercase tracking-tighter !p-6 shadow-xl shadow-brand-blue/5"
        />
      </div>
    </section>
  );
};
