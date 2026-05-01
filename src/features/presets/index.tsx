import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PRESET_WORKOUTS } from '../../constants/presets';
import { PresetCard } from './components/PresetCard';

export const PresetsScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="">
      <header className="">
        <button 
          onClick={() => navigate(-1)} 
          className=""
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 className="">
            Библиотека
          </h2>
          <p className="">
            Выбери готовый шаблон
          </p>
        </div>
      </header>

      <div className="">
        {PRESET_WORKOUTS.map((preset) => (
          <PresetCard key={preset.name} preset={preset} />
        ))}
      </div>
    </div>
  );
};
