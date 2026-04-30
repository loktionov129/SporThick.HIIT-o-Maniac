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
    <div className="flex items-center gap-1 bg-[#161f35] p-1.5 rounded-xl border border-slate-700/50 shadow-inner">
      <button 
        type="button" 
        onClick={() => onChange(Math.max(min, value - 1))} 
        className="cursor-pointer w-10 h-10 flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg transition-all active:scale-90"
      >
        <Minus size={16}/>
      </button>

      <span className="text-xl font-black text-blue-500 min-w-[40px] text-center tabular-nums">
        {value}
      </span>

      <button 
        type="button" 
        onClick={() => onChange(value + 1)} 
        className="cursor-pointer w-10 h-10 flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg transition-all active:scale-90"
      >
        <Plus size={16}/>
      </button>
    </div>
  );
};
