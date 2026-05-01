import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Share, Settings, Moon, History, Database, Dumbbell, Volume2 } from 'lucide-react';
import { useWorkoutStore, useWorkoutActions } from '../../store/useWorkoutStore';
import { Button } from '../../components/ui/Button';

const SLIDES = [
  {
    id: 'welcome',
    title: 'MANIAC MODE',
    desc: 'Твой новый уровень HIIT. Здесь нет места оправданиям — только дисциплина и результат.',
    icon: <Zap size={48} />,
    color: 'text-brand-blue',
    bg: 'bg-brand-blue/10'
  },
  {
    id: 'custom',
    title: 'ПОЛНЫЙ КОНТРОЛЬ',
    desc: 'Настраивай раунды, время отдыха и звуковые сигналы под свой темп. Маньяк любит детали.',
    icon: <Settings size={48} />,
    color: 'text-brand-emerald',
    bg: 'bg-brand-emerald/10'
  },
  {
    id: 'theme',
    title: 'ТЬМА ИЛИ СВЕТ',
    desc: 'Смена темы одним тапом в навигации. Экономь заряд или тренируйся на ярком солнце.',
    icon: <Moon size={48} />,
    color: 'text-brand-blue',
    bg: 'bg-brand-blue/5'
  },
  {
    id: 'audio',
    title: 'ЗВУКОВОЙ ДРАЙВ',
    desc: 'Включай или отключай звуковые сигналы в один тап в шапке профиля. Твой ритм — твои правила.',
    icon: <Volume2 size={48} />,
    color: 'text-brand-blue',
    bg: 'bg-brand-blue/10'
  },
  {
    id: 'content',
    title: 'БИБЛИОТЕКА И ЗАЛ',
    desc: 'Выбирай готовые Tabata/HIIT шаблоны или создавай свои уникальные программы с нуля.',
    icon: <Dumbbell size={48} />,
    color: 'text-brand-emerald',
    bg: 'bg-brand-emerald/10'
  },
  {
    id: 'history',
    title: 'ТВОЯ ИСТОРИЯ',
    desc: 'Отслеживай каждую завершенную сессию. Анализируй прогресс и бей свои рекорды.',
    icon: <History size={48} />,
    color: 'text-brand-blue',
    bg: 'bg-brand-blue/10'
  },
  {
    id: 'data',
    title: 'БЕЗОПАСНОСТЬ',
    desc: 'Импортируй и экспортируй свои данные в JSON. Твои программы всегда под твоим контролем.',
    icon: <Database size={48} />,
    color: 'text-brand-emerald',
    bg: 'bg-brand-emerald/10'
  },
  {
    id: 'pwa',
    title: 'НА ЭКРАН ДОМОЙ',
    desc: 'Жми "Поделиться" → "На экран Домой". Тренируйся без браузерных строк, как в нативном приложении.',
    icon: <Share size={48} />,
    color: 'text-brand-rose',
    bg: 'bg-brand-rose/10',
    isPWA: true
  }
];

export const Onboarding = () => {
  const [current, setCurrent] = useState(0);
  const { hasSeenOnboarding } = useWorkoutStore(s => s.settings);
  const { completeOnboarding } = useWorkoutActions();

  if (hasSeenOnboarding) return null;

  const next = () => {
    if (current < SLIDES.length - 1) setCurrent(c => c + 1);
    else completeOnboarding();
  };

  const slide = SLIDES[current];

  return (
    <div className="fixed inset-0 z-[200] bg-surface-main flex flex-col p-8 overflow-hidden">
      {/* Прогресс-бары сверху */}
      <div className="flex gap-2 mb-12">
        {SLIDES.map((_, i) => (
          <div key={i} className="h-1 flex-1 bg-surface-accent rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-brand-blue"
              initial={{ width: 0 }}
              animate={{ width: i === current ? '100%' : i < current ? '100%' : '0%' }}
              transition={{ duration: 0.4 }}
            />
          </div>
        ))}
      </div>

      {/* Контент слайда */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -20 }}
            className="flex flex-col items-center"
          >
            <div className={`size-32 ${slide.bg} ${slide.color} rounded-[2.5rem] flex items-center justify-center mb-10 shadow-2xl relative`}>
               {/* Декоративное свечение */}
               <div className={`absolute inset-0 ${slide.bg} blur-3xl opacity-50`} />
               <div className="relative z-10">{slide.icon}</div>
            </div>

            <h2 className="text-4xl font-black uppercase italic tracking-tighter text-text-primary mb-4 leading-none">
              {slide.title}
            </h2>
            <p className="text-sm text-text-muted leading-relaxed max-w-[280px]">
              {slide.desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Кнопка управления */}
      <div className="pt-8">
        <Button 
          variant={current === SLIDES.length - 1 ? 'primary' : 'secondary'} 
          fullWidth 
          onClick={next}
          className="py-5 uppercase font-black italic tracking-widest text-lg"
        >
          {current === SLIDES.length - 1 ? 'ПОГНАЛИ ТРЕНИТЬ!' : 'ДАЛЕЕ'}
        </Button>
      </div>
      
      {/* Зоны тапа для быстрого переключения (как в сторис) */}
      <div className="absolute inset-x-0 top-20 bottom-32 flex">
        <div className="flex-1 cursor-pointer" onClick={() => setCurrent(c => Math.max(0, c - 1))} />
        <div className="flex-1 cursor-pointer" onClick={next} />
      </div>
    </div>
  );
};
