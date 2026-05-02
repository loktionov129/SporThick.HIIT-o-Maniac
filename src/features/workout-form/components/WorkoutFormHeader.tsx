import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const WorkoutFormHeader: React.FC<{ isEdit: boolean }> = ({ isEdit }) => (
  <div className="flex items-center justify-between px-2 mb-8 select-none" role="navigation">
    <NavLink 
      to="/" 
      className="p-2 -ml-2 text-text-muted hover:text-brand-blue transition-colors active:scale-90"
      title="Назад в зал"
    >
      <ArrowLeft size={28} strokeWidth={2.5} />
    </NavLink>

    <h2 className="text-[11px] font-black uppercase italic tracking-[0.3em] text-text-primary leading-none">
      {isEdit ? 'Редактирование' : 'Новая программа'}
    </h2>

    <div className="w-11" /> 
  </div>
);
