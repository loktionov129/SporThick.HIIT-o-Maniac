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
      className=""
      {...props}
    >
      {children}
    </button>
  );
};
