import { Volume2, Settings2 } from 'lucide-react';
import { Button } from '@ui/Button';
import { DataCard } from './DataCard';
import { useWorkoutStore } from '../../../store/useWorkoutStore';
import { NavLink } from 'react-router-dom';
import { SOUND_PRESETS } from '@/constants/sounds';

export const SoundSettings = () => {
  const { settings, actions } = useWorkoutStore();
  const activePreset = SOUND_PRESETS[settings.soundPreset as keyof typeof SOUND_PRESETS] || SOUND_PRESETS.maniac;

  return (
    <DataCard
      title="Озвучка"
      subtitle="Голосовое сопровождение сессий."
      icon={Volume2}
      bgIcon={Volume2}
    >
      <div className="relative">
        <div className="flex justify-end -mt-12 mb-4">
          <Button
            variant={settings.soundEnabled ? 'primary' : 'secondary'}
            onClick={() => actions.toggleSound()}
            className="!px-4 !py-1 !h-8 !text-[10px] !rounded-full shadow-none"
          >
            {settings.soundEnabled ? 'ВКЛ' : 'ВЫКЛ'}
          </Button>
        </div>

        <div className={`
          flex items-center justify-between p-4 rounded-2xl border-2 transition-all
          ${settings.soundEnabled 
            ? 'bg-surface-accent/20 border-brand-blue/30 shadow-lg shadow-brand-blue/5' 
            : 'bg-surface-accent/10 border-transparent opacity-50 grayscale'
          }
        `}>
          <div className="flex items-center gap-4">
            <span className="text-4xl filter drop-shadow-md">
              {activePreset.icon}
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue italic">
                Текущий пак
              </span>
              <span className="text-lg font-black uppercase italic tracking-tighter text-text-primary">
                {activePreset.name}
              </span>
            </div>
          </div>

          <NavLink to={`/sounds?preset=${settings.soundPreset}`}>
            <Button
              variant="secondary"
              disabled={!settings.soundEnabled}
              className="!size-12 !p-0 !rounded-xl border border-text-primary/10 hover:border-brand-blue/50 hover:bg-brand-blue/5 group/btn transition-all"
            >
              <Settings2 size={20} className="group-hover/btn:rotate-90 transition-transform duration-500" />
            </Button>
          </NavLink>
        </div>
      </div>
    </DataCard>
  );
};
