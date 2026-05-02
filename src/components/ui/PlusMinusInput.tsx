import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from './Button';

interface PlusMinusInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
}

export const PlusMinusInput: React.FC<PlusMinusInputProps> = ({ value, onChange, min = 1 }) => {
  return (
    <div className="flex items-center gap-4 bg-surface-accent/50 p-2 rounded-2xl border border-text-primary/5">
      <Button 
        variant="secondary" 
        onClick={() => onChange(Math.max(min, value - 1))}
        className="!size-12 !p-0 shadow-sm"
      >
        <Minus size={20} strokeWidth={3} />
      </Button>

      <div className="flex-1 text-center min-w-[60px]">
        <span className="text-3xl font-black italic text-text-primary tracking-tighter">
          {value}
        </span>
      </div>

      <Button 
        variant="secondary" 
        onClick={() => onChange(value + 1)}
        className="!size-12 !p-0 shadow-sm"
      >
        <Plus size={20} strokeWidth={3} />
      </Button>
    </div>
  );
};
