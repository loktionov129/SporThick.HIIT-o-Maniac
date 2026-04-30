import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="w-full space-y-1.5 group">
      {label && (
        <label className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-black ml-1 italic transition-colors group-focus-within:text-brand-blue">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={`
            w-full bg-surface-accent border border-text-muted/10 text-text-primary px-5 py-4 rounded-[20px] 
            placeholder:text-text-muted/40 font-bold text-base
            outline-none transition-all duration-300
            focus:bg-surface-card focus:border-brand-blue/50 
            focus:shadow-[0_0_20px_rgba(59,130,246,0.1)]
            ${className}
          `}
          {...props}
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brand-blue rounded-full transition-all duration-300 group-focus-within:w-1/3 opacity-50" />
      </div>
    </div>
  );
};
