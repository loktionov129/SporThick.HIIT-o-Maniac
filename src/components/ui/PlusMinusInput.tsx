import React, { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';

interface PlusMinusInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
}

export const PlusMinusInput: React.FC<PlusMinusInputProps> = ({ value, onChange, min = 1 }) => {
  const [inputValue, setInputValue] = useState<string>(value.toString());

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setInputValue(rawValue);

    const parsed = parseInt(rawValue);
    if (!isNaN(parsed)) {
      onChange(parsed);
    }
  };

  const handleBlur = () => {
    const parsed = parseInt(inputValue);
    if (isNaN(parsed) || parsed < min) {
      onChange(min);
      setInputValue(min.toString());
    }
  };

  return (
    <div className="flex items-center gap-2 bg-surface-accent/30 p-1.5 rounded-xl border border-text-primary/5 w-full max-w-[160px] mx-auto">
      <Button 
        variant="secondary" 
        onClick={() => onChange(Math.max(min, value - 1))}
        className="!size-10 !p-0 bg-surface-card hover:bg-surface-accent shrink-0 z-10"
      >
        <Minus size={18} strokeWidth={3} />
      </Button>

      <div className="flex-1 min-w-[40px]">
        <Input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className="!bg-transparent !border-none !p-0 !h-10 text-2xl font-black italic text-text-primary text-center tracking-tighter shadow-none"
        />
      </div>

      <Button 
        variant="secondary" 
        onClick={() => onChange(value + 1)}
        className="!size-10 !p-0 bg-surface-card hover:bg-surface-accent shrink-0 z-10"
      >
        <Plus size={18} strokeWidth={3} />
      </Button>
    </div>
  );
};
