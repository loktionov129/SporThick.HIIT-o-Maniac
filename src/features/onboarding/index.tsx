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
    icon: <Zap size={48} className="" />,
    color: 'bg-brand-blue'
  },
  {
    id: 'pwa',
    title: 'ПРИЛОЖЕНИЕ ВСЕГДА С ТОБОЙ',
    desc: 'Нажми "Поделиться" и выбери "На экран Домой", чтобы тренироваться в один тап.',
    icon: <Share size={48} className="" />,
    color: 'bg-brand-emerald',
    isPWA: true
  },
  {
    id: 'presets',
    title: 'ГОТОВЫЕ ПРОГРАММЫ',
    desc: 'В библиотеке уже ждут Tabata, HIIT и авторские протоколы.',
    icon: <Library size={48} className="" />,
    color: 'bg-brand-blue'
  },
  {
    id: 'custom',
    title: 'ПОДСТРОЙ ПОД СЕБЯ',
    desc: 'Меняй раунды, отдых и звуковые сигналы. Маньяк любит контроль.',
    icon: <Settings size={48} className="" />,
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
    <div className="">
      <div className="">
        {SLIDES.map((_, i) => (
          <div key={i} className="">
            <motion.div 
              className=""
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
          className=""
        >
          <div className="">
            <div className="" />
            <div className="">{slide.icon}</div>
            
            {slide.isPWA && !isStandalone && (
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className=""
              >
                ЖМИ ПОДЕЛИТЬСЯ ↑
              </motion.div>
            )}
          </div>

          <h2 className="">
            {slide.title}
          </h2>
          <p className="">
            {slide.desc}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="">
        <div className="" onClick={prev} />
        <div className="" onClick={next} />
      </div>

      <div className="">
        <Button 
          variant={current === SLIDES.length - 1 ? 'primary' : 'ghost'} 
          fullWidth 
          onClick={next}
          className=""
        >
          {current === SLIDES.length - 1 ? 'ПОГНАЛИ ТРЕНИТЬ!' : 'ДАЛЕЕ'}
        </Button>
      </div>
    </div>
  );
};
