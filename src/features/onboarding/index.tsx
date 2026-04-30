import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Share, Library, Settings } from 'lucide-react';
import { useWorkoutStore, useWorkoutActions } from '../../store/useWorkoutStore';
import { Button } from '../../components/ui/Button';

const SLIDES = [
  {
    id: 'welcome',
    title: 'MANIAC MODE',
    desc: 'Здесь нет места оправданиям. Только ты и твой результат.',
    icon: <Zap size={48} className="text-brand-blue" />,
    color: 'bg-brand-blue'
  },
  {
    id: 'pwa',
    title: 'ПРИЛОЖЕНИЕ ВСЕГДА С ТОБОЙ',
    desc: 'Нажми "Поделиться" и выбери "На экран Домой", чтобы тренироваться в один тап.',
    icon: <Share size={48} className="text-brand-emerald" />,
    color: 'bg-brand-emerald',
    isPWA: true
  },
  {
    id: 'presets',
    title: 'ГОТОВЫЕ ПРОГРАММЫ',
    desc: 'В библиотеке уже ждут Tabata, HIIT и авторские протоколы.',
    icon: <Library size={48} className="text-brand-blue" />,
    color: 'bg-brand-blue'
  },
  {
    id: 'custom',
    title: 'ПОДСТРОЙ ПОД СЕБЯ',
    desc: 'Меняй раунды, отдых и звуковые сигналы. Маньяк любит контроль.',
    icon: <Settings size={48} className="text-text-muted" />,
    color: 'bg-surface-accent'
  }
];

export const Onboarding = () => {
  const [current, setCurrent] = useState(0);
  const { hasSeenOnboarding } = useWorkoutStore(s => s.settings);
  const { completeOnboarding } = useWorkoutActions();

  useEffect(() => {
    if (!hasSeenOnboarding) {
      setCurrent(0);
    }
  }, [hasSeenOnboarding]);
  
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
    || (window.navigator as any).standalone;

  if (hasSeenOnboarding) return null;

  const next = () => {
    if (current < SLIDES.length - 1) setCurrent(c => c + 1);
    else completeOnboarding();
  };

  const prev = () => {
    if (current > 0) setCurrent(c => c - 1);
  };

  const slide = SLIDES[current];

  return (
    <div className="fixed inset-0 z-[200] bg-surface-main flex flex-col overflow-hidden">
      <div className="flex gap-1.5 px-4 pt-6 relative z-10">
        {SLIDES.map((_, i) => (
          <div key={i} className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: i === current ? '100%' : i < current ? '100%' : '0%' }}
              transition={{ duration: 0.5 }}
            />
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="flex-1 flex flex-col items-center justify-center p-8 text-center"
        >
          <div className={`p-8 rounded-[40px] ${slide.color}/10 mb-10 relative`}>
            <div className={`absolute inset-0 ${slide.color}/20 blur-3xl rounded-full`} />
            <div className="relative z-10 text-white">{slide.icon}</div>
            
            {slide.isPWA && !isStandalone && (
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-3 py-1 rounded-full whitespace-nowrap"
              >
                ЖМИ ПОДЕЛИТЬСЯ ↑
              </motion.div>
            )}
          </div>

          <h2 className="text-3xl font-black text-text-primary uppercase italic tracking-tighter mb-4">
            {slide.title}
          </h2>
          <p className="text-text-muted text-base font-medium leading-relaxed max-w-[280px]">
            {slide.desc}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex">
        <div className="w-1/3 h-full cursor-pointer" onClick={prev} />
        <div className="w-2/3 h-full cursor-pointer" onClick={next} />
      </div>

      <div className="p-8 relative z-20">
        <Button 
          variant={current === SLIDES.length - 1 ? 'primary' : 'ghost'} 
          fullWidth 
          onClick={next}
          className="py-6"
        >
          {current === SLIDES.length - 1 ? 'ПОГНАЛИ ТРЕНИТЬ!' : 'ДАЛЕЕ'}
        </Button>
      </div>
    </div>
  );
};
