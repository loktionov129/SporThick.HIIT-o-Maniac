import React from 'react';
import { Trophy, Clock, RotateCcw } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { FullScreenCenter } from './FullScreenCenter';

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
      <div className="flex flex-col items-center text-center animate-in fade-in zoom-in duration-700 px-4">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-yellow-500 blur-3xl opacity-20 animate-pulse" />
          <div className="relative bg-yellow-500/20 p-8 rounded-full inline-block border border-yellow-500/30 shadow-2xl shadow-yellow-500/10">
            <Trophy className="text-yellow-500 w-20 h-20" />
          </div>
        </div>

        <h2 className="text-4xl font-black text-white mb-2 tracking-tight uppercase italic">
          Победа!
        </h2>
        <p className="text-slate-400 mb-10 font-medium">Тренировка завершена. Мощный результат!</p>

        <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-12">
          <div className="bg-[#0b1224]/50 border border-slate-800 p-6 rounded-[28px] backdrop-blur-sm">
            <Clock className="text-blue-500 mx-auto mb-3" size={24} />
            <span className="block text-2xl font-black text-white tabular-nums tracking-tight">
              {formatTime(totalTime)}
            </span>
            <span className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] mt-2 block">
              Время
            </span>
          </div>

          <div className="bg-[#0b1224]/50 border border-slate-800 p-6 rounded-[28px] backdrop-blur-sm">
            <RotateCcw className="text-emerald-500 mx-auto mb-3" size={24} />
            <span className="block text-2xl font-black text-white tabular-nums tracking-tight">
              {totalRounds}
            </span>
            <span className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] mt-2 block">
              Кругов
            </span>
          </div>
        </div>

        <Button 
          onClick={onFinish} 
          fullWidth 
          variant="primary" 
          className="py-5 text-sm font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-600/20 active:scale-95"
        >
          Вернуться к списку
        </Button>
      </div>
    </FullScreenCenter>
  );
};
