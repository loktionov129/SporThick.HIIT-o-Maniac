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
    <div className="flex items-center gap-2 bg-[#161f35] px-3 py-1.5 rounded-xl border border-slate-700/50 transition-colors focus-within:border-slate-600 shadow-inner">
      <div className="text-slate-500 ml-1">
        {icon}
      </div>

      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0))}
        className="w-10 bg-transparent text-blue-500 text-xl font-black focus:outline-none text-center tabular-nums [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />

      <span className="text-[10px] text-slate-500 font-bold uppercase mr-1">
        {label}
      </span>

      <div className="flex flex-col border-l border-slate-700/50 pl-2 gap-0.5">
        <button 
          type="button" 
          onClick={increment}
          className="cursor-pointer text-slate-600 hover:text-blue-500 transition-colors active:scale-110"
        >
          <ChevronUp size={14} strokeWidth={3} />
        </button>
        <button 
          type="button" 
          onClick={decrement}
          className="cursor-pointer text-slate-600 hover:text-blue-500 transition-colors active:scale-110"
        >
          <ChevronDown size={14} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};
