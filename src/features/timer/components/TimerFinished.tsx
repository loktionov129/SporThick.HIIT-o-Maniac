import React from 'react';
import { Trophy, Clock, RotateCcw } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { FullScreenCenter } from './FullScreenCenter';
import { StatBox } from './StatBox';

interface TimerFinishedProps {
  onFinish: () => void;
  totalTime: number;
  totalRounds: number;
}

export const TimerFinished: React.FC<TimerFinishedProps> = ({ onFinish, totalTime, totalRounds }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <FullScreenCenter>
      <div className="flex flex-col items-center text-center animate-in fade-in zoom-in duration-700 px-4 w-full">
        <div className="relative mb-10">
          <div className="absolute inset-0 bg-amber-500 blur-3xl opacity-20 dark:opacity-30 animate-pulse" />
          <div className="relative bg-amber-500/10 p-8 rounded-[40px] inline-block border border-amber-500/20 shadow-2xl shadow-amber-500/5">
            <Trophy className="text-amber-500 w-20 h-20 sm:w-24 sm:h-24" />
          </div>
        </div>

        <h2 className="text-4xl sm:text-5xl font-black text-text-primary mb-3 tracking-tighter uppercase italic leading-none">
          Победа!
        </h2>
        <p className="text-text-muted mb-12 font-bold uppercase text-[11px] tracking-[0.2em] opacity-80">
          Тренировка завершена. Мощный результат!
        </p>

        <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-12">
          <StatBox 
            icon={<Clock className="text-brand-blue" size={24} />}
            value={formatTime(totalTime)}
            label="Время"
          />
          <StatBox 
            icon={<RotateCcw className="text-brand-emerald" size={24} />}
            value={totalRounds}
            label="Кругов"
          />
        </div>

        <Button 
          onClick={onFinish} 
          fullWidth 
          variant="primary" 
          className="py-6 text-sm font-black uppercase tracking-[0.2em] shadow-2xl active:scale-95"
        >
          Завершить
        </Button>
      </div>
    </FullScreenCenter>
  );
};

