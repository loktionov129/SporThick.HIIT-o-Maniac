import React from 'react';
import { Clock, ChevronUp, ChevronDown } from 'lucide-react';

interface TimerInputProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  icon?: React.ReactNode;
}

export const TimerInput: React.FC<TimerInputProps> = ({ 
  value, 
  onChange, 
  label = "s", 
  icon = <Clock size={16} /> 
}) => {
  
  const increment = () => onChange(value + 1);
  const decrement = () => onChange(Math.max(0, value - 1));

  return (
    <div className="flex items-center gap-2 bg-surface-accent px-4 py-2 rounded-2xl border border-text-muted/10 transition-all focus-within:border-brand-blue/40 shadow-inner group">
      <div className="text-text-muted group-focus-within:text-brand-blue transition-colors">
        {icon}
      </div>

      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0))}
        className="w-12 bg-transparent text-brand-blue text-2xl font-black focus:outline-none text-center tabular-nums [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:text-text-muted/30"
      />

      <span className="text-[10px] text-text-muted font-black uppercase tracking-widest mr-1 opacity-70">
        {label}
      </span>

      <div className="flex flex-col border-l border-text-muted/10 pl-3 gap-1">
        <button 
          type="button" 
          onClick={increment}
          className="cursor-pointer p-1 text-text-muted hover:text-brand-blue transition-all active:scale-125"
          aria-label="Увеличить"
        >
          <ChevronUp size={16} strokeWidth={3} />
        </button>
        <button 
          type="button" 
          onClick={decrement}
          className="cursor-pointer p-1 text-text-muted hover:text-brand-rose transition-all active:scale-125"
          aria-label="Уменьшить"
        >
          <ChevronDown size={16} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};
