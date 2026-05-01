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
    <div className="">
      <div className="">
        {icon}
      </div>

      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0))}
        className=""
      />

      <span className="">
        {label}
      </span>

      <div className="">
        <button 
          type="button" 
          onClick={increment}
          className=""
          aria-label="Увеличить"
        >
          <ChevronUp size={16} strokeWidth={3} />
        </button>
        <button 
          type="button" 
          onClick={decrement}
          className=""
          aria-label="Уменьшить"
        >
          <ChevronDown size={16} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};
