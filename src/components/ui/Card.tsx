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
        bg-surface-card border border-text-muted/10 p-5 rounded-[24px] 
        transition-all duration-300 shadow-sm
        ${onClick ? `
          cursor-pointer 
          hover:bg-surface-accent hover:border-brand-blue/30 
          hover:shadow-md active:scale-[0.98]
        ` : ''} 
        ${className}
      `}
    >
      {children}
    </div>
  );
};
