import React from 'react';

export const WorkoutFooter: React.FC<{ showHint: boolean }> = ({ showHint }) => {
  if (!showHint) {
    return null;
  }
  
  return (
    <div className="flex flex-col items-center gap-4 mt-2 opacity-30">
      <p className="text-[9px] font-black uppercase tracking-[0.25em] text-text-muted italic">
        Зажми и тяни для сортировки
      </p>
      <div className="h-px w-12 bg-text-muted/50" />
    </div>
  );
};
