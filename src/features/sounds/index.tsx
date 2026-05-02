import { NavLink, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Play, Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useWorkoutStore } from '@store/useWorkoutStore';
import { initManiacSounds, playSignal, type SignalType } from '@utils/beep';
import type { SoundPreset } from '@app-types/index';
import { PRESETS_ARRAY, SIGNAL_NAMES } from '@/constants/sounds';

export const SoundsScreen = () => {
  const [searchParams] = useSearchParams();
  const activeId = (searchParams.get('preset') as SoundPreset) || 'maniac';
  const { settings, actions } = useWorkoutStore();

  const isSelected = settings.soundPreset === activeId;
  initManiacSounds(activeId);

  return (
    <div className="min-h-screen bg-surface-main flex flex-col overflow-hidden">
      {/* 1. HEADER */}
      <div className="p-4 flex items-center justify-between z-20 border-b border-text-primary/5">
        <NavLink to="/data">
          <Button variant="ghost" className="!p-2">
            <ArrowLeft size={24} />
          </Button>
        </NavLink>
        <h2 className="text-xl font-black uppercase italic tracking-tighter">Звуковой движок</h2>
        <div className="w-10" />
      </div>

      {/* 2. СЕЛЕКТОР ПРЕСЕТОВ (Горизонтальный скролл) */}
      <div className="flex gap-4 px-6 py-6 overflow-x-auto no-scrollbar bg-surface-accent/10 shadow-inner">
        {PRESETS_ARRAY.map((p) => {
          // Проверяем активность по ID из URL, а не через NavLink
          const isActiveInUrl = activeId === p.id;
          const isSelectedInSettings = settings.soundPreset === p.id;

          return (
            <NavLink 
              key={p.id} 
              to={`/sounds?preset=${p.id}`}
              className="relative flex-shrink-0"
            >
              <Button
                /* Теперь вариант зависит от нашего ID, а не от глючного NavLink */
                variant={isActiveInUrl ? 'primary' : 'secondary'}
                className={`
                  !size-16 !p-0 !rounded-2xl text-3xl transition-all duration-300
                  ${isActiveInUrl 
                    ? 'scale-110 z-10 border-2 border-white/10 shadow-[0_0_20px_rgba(59,130,246,0.4)]' 
                    : 'opacity-40 hover:opacity-100'}
                `}
              >
                {p.icon}
              </Button>

              {/* ГАЛОЧКА: Висит на том паке, который реально выбран в настройках */}
              {isSelectedInSettings && (
                <div className="absolute -top-1 -right-1 size-5 bg-brand-emerald rounded-lg border-2 border-surface-main flex items-center justify-center shadow-lg z-20 animate-in zoom-in duration-300">
                  <Check size={12} className="text-white" strokeWidth={4} />
                </div>
              )}
            </NavLink>
          );
        })}
      </div>


      <main className="flex-1 p-6 space-y-6 max-w-lg mx-auto w-full overflow-y-auto pb-10">
        {/* 3. КАРТОЧКА АКТИВНОГО ПРЕСЕТА */}
        <Card className="relative p-8 flex flex-col items-center border-brand-blue/20 bg-brand-blue/5 overflow-hidden">
          <div className="relative z-10 flex flex-col items-center">
            <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-2">{activeId}</h1>
            
            {/* КНОПКА ВЫБОРА ВНУТРИ КАРТОЧКИ */}
            <Button 
              variant={isSelected ? 'secondary' : 'primary'}
              onClick={() => actions.setSoundPreset(activeId)}
              className="mt-4 !py-2 !px-6 !h-auto !rounded-full shadow-lg"
            >
              {isSelected ? (
                <div className="flex items-center gap-2 text-[10px]">
                  <Check size={14} strokeWidth={4} /> ИСПОЛЬЗУЕТСЯ
                </div>
              ) : (
                <span className="text-[10px]">ВЫБРАТЬ ЭТОТ ПАК</span>
              )}
            </Button>
          </div>
        </Card>

        {/* 4. СПИСОК ЗВУКОВ (Тот же стиль, но компактнее) */}
        <div className="space-y-2">
          {Object.keys(SIGNAL_NAMES).map((signalKey) => (
            <div 
              key={signalKey}
              className="flex items-center justify-between p-3 pl-5 rounded-xl bg-surface-accent/20 border border-text-primary/5 hover:border-brand-blue/20 transition-all"
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase italic text-brand-blue tracking-widest leading-none mb-1">
                  {SIGNAL_NAMES[signalKey]?.name || signalKey}
                </span>
                <span className="text-[10px] text-text-muted italic opacity-60">
                  {SIGNAL_NAMES[signalKey]?.desc}
                </span>
              </div>

              <Button 
                variant="secondary" 
                className="!size-10 !p-0 !rounded-lg hover:bg-brand-blue hover:text-white"
                onClick={() => playSignal(signalKey as SignalType)}
              >
                <Play size={14} fill="currentColor" />
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
