import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted px-2 italic">
          {label}
        </label>
      )}
      <div className="relative group">
        <input
          className={`
            w-full bg-surface-card text-text-primary rounded-2xl px-6 py-4 
            border border-text-primary/5 outline-none
            placeholder:text-text-muted/50 text-sm font-bold
            focus:border-brand-blue/30 focus:bg-surface-accent transition-all
            ${className}
          `}
          {...props}
        />
        <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-brand-blue scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 rounded-full" />
      </div>
    </div>
  );
};
