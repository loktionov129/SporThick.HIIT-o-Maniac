import React from 'react';

export const Card: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  onClick?: () => void 
}> = ({ 
  children, 
  className = '', 
  onClick 
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-[#0b1224] border border-slate-800/60 p-5 rounded-2xl 
        transition-all duration-300 
        ${onClick ? 'cursor-pointer hover:bg-slate-800/40 active:scale-[0.99]' : ''} 
        ${className}
      `}
    >
      {children}
    </div>
  );
};
