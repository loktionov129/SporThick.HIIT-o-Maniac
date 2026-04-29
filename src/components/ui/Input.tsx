import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold ml-1">
          {label}
        </label>
      )}
      <input
        className={`
          w-full bg-slate-900 border border-slate-800 text-white px-5 py-4 rounded-2xl 
          focus:outline-none focus:border-blue-500 transition-colors 
          placeholder:text-slate-700 font-semibold ${className}
        `}
        {...props}
      />
    </div>
  );
};
