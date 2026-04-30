import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth, 
  className = '', 
  ...props 
}) => {
  const variants = {
    primary: 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20 hover:bg-blue-500',
    secondary: 'bg-surface-accent text-text-primary border border-text-muted/10 hover:bg-surface-card hover:border-brand-blue/30',
    danger: 'bg-brand-rose/10 text-brand-rose border border-brand-rose/20 hover:bg-brand-rose hover:text-white',
    ghost: 'bg-transparent text-text-muted hover:bg-surface-accent hover:text-text-primary',
  };

  return (
    <button 
      className={`
        flex items-center justify-center gap-2 px-6 py-4 rounded-[20px] font-black uppercase text-[11px] tracking-[0.15em]
        transition-all duration-200 active:scale-95 cursor-pointer 
        disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100
        touch-manipulation
        ${variants[variant]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
