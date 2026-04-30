import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface PlusMinusInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
}

export const PlusMinusInput: React.FC<PlusMinusInputProps> = ({ 
  value, 
  onChange, 
  min = 1 
}) => {
  return (
    <div className="flex items-center gap-1 bg-surface-accent p-1.5 rounded-2xl border border-text-muted/5 shadow-inner transition-colors duration-300">
      <button 
        type="button" 
        onClick={() => onChange(Math.max(min, value - 1))} 
        className="cursor-pointer w-11 h-11 flex items-center justify-center bg-surface-card hover:bg-brand-blue/10 text-text-muted hover:text-brand-blue rounded-xl border border-text-muted/5 transition-all active:scale-90 shadow-sm"
      >
        <Minus size={18} strokeWidth={3} />
      </button>

      <div className="relative min-w-[50px] flex items-center justify-center">
        <div className="absolute inset-0 bg-brand-blue/10 blur-md rounded-full opacity-50" />
        <span className="relative z-10 text-2xl font-black text-brand-blue tabular-nums tracking-tighter">
          {value}
        </span>
      </div>

      <button 
        type="button" 
        onClick={() => onChange(value + 1)} 
        className="cursor-pointer w-11 h-11 flex items-center justify-center bg-surface-card hover:bg-brand-blue/10 text-text-muted hover:text-brand-blue rounded-xl border border-text-muted/5 transition-all active:scale-90 shadow-sm"
      >
        <Plus size={18} strokeWidth={3} />
      </button>
    </div>
  );
};
