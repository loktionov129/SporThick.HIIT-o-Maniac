import React from 'react';
import { NavLink } from 'react-router-dom';
import { Trophy, Clock, RotateCcw } from 'lucide-react';
import { Button } from '@ui/Button';
import { FullScreenCenter } from './FullScreenCenter';
import { StatBox } from './StatBox';

interface TimerFinishedProps {
  totalTime: number;
  totalRounds: number;
}

export const TimerFinished: React.FC<TimerFinishedProps> = ({ totalTime, totalRounds }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
  <FullScreenCenter>
    <div className="flex flex-col items-center w-full max-w-[320px] animate-in fade-in zoom-in duration-700">
      
      {/* ТРОФЕЙ: В золотом ореоле */}
      <div className="relative mb-8 group">
        {/* Мягкое свечение на фоне */}
        <div className="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full animate-pulse" />
        
        <div className="relative size-24 rounded-[2.5rem] bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-[0_15px_40px_rgba(245,158,11,0.4)] transition-transform group-hover:scale-110 duration-500">
          <Trophy className="text-white drop-shadow-lg" size={48} strokeWidth={1.5} />
        </div>
      </div>

      {/* ТЕКСТ ТРИУМФА */}
      <div className="text-center space-y-3 mb-10">
        <h2 className="text-4xl font-black uppercase italic tracking-tighter text-text-primary leading-none">
          Победа<span className="text-amber-500">!</span>
        </h2>
        <p className="text-sm font-bold text-text-muted italic leading-relaxed px-4">
          Тренировка завершена.<br />
          Результат — просто <span className="text-text-primary uppercase tracking-widest">разрыв</span>.
        </p>
      </div>

      {/* ИТОГОВЫЕ СТАТЫ: В два столбца */}
      <div className="grid grid-cols-2 gap-4 w-full mb-12">
        <StatBox 
          icon={<Clock className="text-brand-blue" />}
          value={formatTime(totalTime)}
          label="Время"
        />
        <StatBox 
          icon={<RotateCcw className="text-brand-emerald" />}
          value={totalRounds}
          label="Кругов"
        />
      </div>

      {/* КНОПКА ЗАВЕРШЕНИЯ: Массивная и тактильная */}
      <NavLink to="/history" className="w-full">
        <Button 
          fullWidth 
          variant="primary" 
          className="!py-5 !rounded-3xl shadow-[0_15px_40px_rgba(59,130,246,0.3)] hover:brightness-110 active:scale-95 transition-all"
        >
          Зафиксировать
        </Button>
      </NavLink>
    </div>
  </FullScreenCenter>
  );
};

