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
    <div className="">
      <button 
        type="button" 
        onClick={() => onChange(Math.max(min, value - 1))} 
        className=""
      >
        <Minus size={18} strokeWidth={3} />
      </button>

      <div className="">
        <div className="" />
        <span className="">
          {value}
        </span>
      </div>

      <button 
        type="button" 
        onClick={() => onChange(value + 1)} 
        className=""
      >
        <Plus size={18} strokeWidth={3} />
      </button>
    </div>
  );
};
