import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PRESET_WORKOUTS } from '../../constants/presets';
import { PresetCard } from './components/PresetCard';

export const PresetsScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-right duration-500">
      <header className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)} 
          className="p-3 bg-surface-accent rounded-2xl text-text-muted hover:text-brand-blue transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-text-primary italic">
            Библиотека
          </h2>
          <p className="text-[10px] text-text-muted uppercase font-black tracking-widest opacity-60">
            Выбери готовый шаблон
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PRESET_WORKOUTS.map((preset) => (
          <PresetCard key={preset.name} preset={preset} />
        ))}
      </div>
    </div>
  );
};
