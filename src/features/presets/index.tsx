import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { PRESET_WORKOUTS } from '../../constants/presets';
import { PresetCard } from './components/PresetCard';
import { Button } from '../../components/ui/Button';

export const PresetsScreen: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* HEADER: Стиль как на экране Данных и Истории */}
      <header className="flex items-center gap-5 px-2">
        <NavLink to="/">
          <Button 
            variant="secondary" 
            className="!size-12 !p-0 rounded-2xl bg-surface-card border-none shadow-sm active:scale-90"
          >
            <ArrowLeft size={24} className="text-text-primary" />
          </Button>
        </NavLink>
        
        <div className="flex flex-col">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-text-primary leading-none">
            Шаблоны
          </h2>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="size-1.5 bg-brand-blue rounded-full animate-pulse" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">
              Библиотека HIIT
            </p>
          </div>
        </div>
      </header>

      {/* GRID: Список шаблонов */}
      <div className="flex flex-col gap-4">
        {PRESET_WORKOUTS.map((preset) => (
          <PresetCard key={preset.name} preset={preset} />
        ))}
      </div>

      {/* FOOTER: Ненавязчивая подсказка */}
      <p className="text-center text-[9px] font-black uppercase tracking-[0.3em] text-text-muted/40 mt-4 italic">
        Нажми на карточку, чтобы добавить в зал
      </p>
    </div>
  );
};
