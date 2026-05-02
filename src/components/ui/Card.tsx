import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick 
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-surface-card 
        rounded-[2.5rem] 
        p-6 
        border border-text-primary/5 
        transition-all duration-300
        ${onClick ? 'cursor-pointer active:scale-[0.98] active:bg-surface-accent' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
