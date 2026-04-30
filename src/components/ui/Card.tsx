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
        /* Заменили bg-slate-900/40 на плотный bg-[#0b1224] */
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
