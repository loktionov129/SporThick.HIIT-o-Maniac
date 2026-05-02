import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  fullWidth?: boolean;
}

const variants = {
  primary: 'bg-brand-blue text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] active:bg-blue-600',
  secondary: 'bg-surface-accent text-text-primary border border-text-muted/10 active:bg-surface-card',
  danger: 'bg-brand-rose/10 text-brand-rose border border-brand-rose/20 active:bg-brand-rose active:text-white',
  ghost: 'bg-transparent text-text-muted active:bg-surface-accent active:text-text-primary',
};

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth, 
  className = '',
  type = 'button',
  ...props 
}) => {
  const hasCustomPadding = className.includes('p-') || className.includes('px-') || className.includes('py-');
  const hasCustomSize = className.includes('size-') || (className.includes('w-') && className.includes('h-'));

  return (
    <button 
      type={type}
      className={`
        inline-flex items-center justify-center 
        rounded-2xl font-black italic uppercase tracking-widest
        transition-all duration-200 
        cursor-pointer active:scale-95 
        disabled:opacity-50 disabled:pointer-events-none
        ${fullWidth ? 'w-full' : ''} 
        ${(!hasCustomPadding && !hasCustomSize) ? 'px-6 py-4' : ''} 
        ${variants[variant]} 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};