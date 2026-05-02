import React from 'react';

interface StatBoxProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}

export const StatBox = ({ icon, value, label }: StatBoxProps) => (
  <div className="flex flex-col items-center justify-center p-4 rounded-[2rem] bg-surface-card/40 border border-text-primary/5 backdrop-blur-sm shadow-xl">
    <div className="size-10 rounded-full bg-surface-accent/30 flex items-center justify-center mb-3 text-brand-blue shadow-inner">
      {React.cloneElement(icon as React.ReactElement, { size: 20, strokeWidth: 2.5 })}
    </div>
    
    <span className="text-2xl font-black italic text-text-primary tracking-tighter leading-none mb-1 tabular-nums">
      {value}
    </span>
    
    {/* Подпись: мелкий капс с разрядкой */}
    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted/60 italic leading-none">
      {label}
    </span>
  </div>
);
