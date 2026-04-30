import React from 'react';

interface WorkoutNameInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const WorkoutNameInput: React.FC<WorkoutNameInputProps> = ({ value, onChange }) => {
  return (
    <section className="space-y-3 group">
      <div className="flex items-center justify-between px-1">
        <label className="text-[11px] uppercase tracking-[0.25em] text-text-muted font-black italic transition-colors group-focus-within:text-brand-blue">
          Название тренировки
        </label>
      </div>
      
      <div className="relative">
        <div className="absolute -inset-1 bg-brand-blue/10 dark:bg-brand-blue/20 rounded-[22px] blur-xl opacity-0 group-focus-within:opacity-100 transition-all duration-500" />
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Напр. Взрывной HIIT"
          className={`
            relative w-full bg-surface-accent border border-text-muted/10 text-text-primary 
            px-6 py-5 rounded-2xl text-xl font-black italic outline-none transition-all duration-300
            placeholder:text-text-muted/30 placeholder:not-italic
            /* Фокус-стейт */
            focus:bg-surface-card focus:border-brand-blue/50 focus:shadow-2xl focus:shadow-brand-blue/5
          `}
        />
        
        <div className={`
          absolute right-5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-all duration-500
          ${value.trim() ? 'bg-brand-emerald shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-text-muted/20'}
        `} />
      </div>
    </section>
  );
};
