import React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const WorkoutNameInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <section className="space-y-3">
      <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold ml-1 italic">
        Название тренировки
      </label>
      
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-blue-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Напр. Разминка"
          className="relative w-full bg-[#050b18] border border-slate-800 text-white px-6 py-4 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all text-lg font-bold placeholder:text-slate-700"
        />
      </div>
    </section>
  );
};
