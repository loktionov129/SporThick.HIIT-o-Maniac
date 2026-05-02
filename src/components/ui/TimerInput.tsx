import React from 'react';
import { Clock, ChevronUp, ChevronDown } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';

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
    <div className="relative flex items-center w-full group">
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0))}
        className="!pl-12 !pr-24 !text-2xl font-black italic tracking-tighter"
      />

      <div className="absolute left-4 text-brand-blue opacity-50 group-focus-within:opacity-100 transition-opacity">
        {icon}
      </div>

      <div className="absolute right-2 flex items-center gap-2">
        <span className="text-[10px] font-black uppercase text-text-muted tracking-widest italic mr-1">
          {label}
        </span>
        
        <div className="flex flex-col gap-0.5 border-l border-text-primary/5 pl-2">
          <Button 
            variant="ghost" 
            onClick={increment}
            className="!p-1 !h-6 !w-8 rounded-lg text-text-muted hover:text-brand-blue"
          >
            <ChevronUp size={16} strokeWidth={4} />
          </Button>

          <Button 
            variant="ghost" 
            onClick={decrement}
            className="!p-1 !h-6 !w-8 rounded-lg text-text-muted hover:text-brand-rose"
          >
            <ChevronDown size={16} strokeWidth={4} />
          </Button>
        </div>
      </div>
    </div>
  );
};
