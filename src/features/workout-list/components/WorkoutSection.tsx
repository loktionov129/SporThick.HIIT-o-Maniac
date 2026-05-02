import React from 'react';

interface WorkoutSectionProps {
  count: number;
  children: React.ReactNode;
  isSearchActive: boolean;
}

export const WorkoutSection: React.FC<WorkoutSectionProps> = ({ 
  count, 
  children, 
  isSearchActive 
}) => {
  return (
    <section className="flex flex-col gap-4 mt-0">
      <div className="flex flex-col items-center justify-center h-12 pt-1 shrink-0">
        <div className="flex items-center gap-3">
          <h3 className="text-[11px] font-black uppercase italic tracking-[0.3em] 
            text-text-primary leading-none">
            {isSearchActive ? 'Результаты поиска' : 'Твои программы'}
          </h3>
          
          <span className="text-[11px] font-black text-brand-blue italic leading-none tabular-nums">
            {count}
          </span>
        </div>

        <div className="h-4 flex items-center justify-center">
          {!isSearchActive && count > 1 ? (
            <p className="text-[8px] font-black uppercase tracking-[0.4em] 
              text-brand-blue/80 leading-none italic">
              Зажми и тяни для сортировки
            </p>
          ) : (
            <div className="h-px w-1 invisible" />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {children}
      </div>
    </section>
  );
};
