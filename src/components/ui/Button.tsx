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
    primary: 'bg-blue-600 text-white shadow-blue-600/20 hover:bg-blue-500',
    secondary: 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white',
    danger: 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white',
    ghost: 'bg-transparent text-slate-500 hover:bg-slate-800',
  };

  return (
    <button 
      className={`
        flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold 
        transition-all duration-200 active:scale-95 cursor-pointer disabled:opacity-50
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
