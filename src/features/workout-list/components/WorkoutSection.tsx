import React from 'react';

interface WorkoutSectionProps {
  title: string;
  count: number;
  children: React.ReactNode;
}

export const WorkoutSection: React.FC<WorkoutSectionProps> = ({ 
  title, 
  count, 
  children 
}) => {
  return (
    <section className="flex flex-col gap-4">
      
      {/* Шапка секции: Заголовок + Линия + Счет */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          {/* Пульсирующая точка для "живого" интерфейса */}
          <div className="size-1.5 bg-brand-blue rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted italic leading-none">
            {title}
          </h3>
        </div>

        {/* Декоративная линия, заполняющая пустоту */}
        <div className="h-px flex-1 mx-4 bg-text-primary/5 rounded-full" />

        {/* Счетчик элементов */}
        <span className="text-[10px] font-black text-brand-blue italic bg-brand-blue/5 px-2 py-0.5 rounded-md">
          {count}
        </span>
      </div>

      {/* Контент: сюда прилетит DragDropContext со списком карточек */}
      <div className="flex flex-col gap-4">
        {children}
      </div>
    </section>
  );
};
