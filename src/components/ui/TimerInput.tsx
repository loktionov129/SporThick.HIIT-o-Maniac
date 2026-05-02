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

export const TimerInput: React.FC<TimerInputProps> = ({ value, onChange, label = "S", icon = <Clock size={14} /> }) => {
  return (
    <div className="relative flex items-center w-full group">
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0))}
        className="!pl-9 !pr-14 !text-xl font-black italic tracking-tighter text-center !h-10"
      />

      <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-brand-blue/40 pointer-events-none z-10">
        {icon}
      </div>

      <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1 z-10">
        <span className="text-[8px] font-black uppercase text-text-muted/30 italic">
          {label}
        </span>
        
        <div className="flex flex-col gap-0 border-l border-text-primary/10 pl-1">
          <Button 
            variant="ghost" 
            onClick={() => onChange(value + 1)}
            className="!p-0 !h-4 !w-6 text-text-muted/40 hover:text-brand-blue"
          >
            <ChevronUp size={12} strokeWidth={4} />
          </Button>

          <Button 
            variant="ghost" 
            onClick={() => onChange(Math.max(0, value - 1))}
            className="!p-0 !h-4 !w-6 text-text-muted/40 hover:text-brand-rose"
          >
            <ChevronDown size={12} strokeWidth={4} />
          </Button>
        </div>
      </div>
    </div>
  );
};
