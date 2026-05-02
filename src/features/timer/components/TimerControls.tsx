import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface TimerControlsProps {
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
}

export const TimerControls: React.FC<TimerControlsProps> = ({ 
  isRunning, 
  onToggle, 
  onReset 
}) => {
  return (
    <div className="w-full max-w-sm mx-auto px-4">
      <div className="flex items-center gap-4">
        {/* КНОПКА СБРОСА */}
        <Button 
          variant="secondary" 
          onClick={onReset}
          className="!size-16 !p-0 rounded-2xl flex items-center justify-center group active:rotate-[-45deg] transition-all"
          title="Сбросить прогресс"
        >
          <RotateCcw 
            size={24} 
            className="text-text-muted/40 group-hover:text-brand-rose group-hover:rotate-[-15deg] transition-all" 
            strokeWidth={2.5}
          />
        </Button>
        
        {/* ГЛАВНАЯ КНОПКА с мощным ховером */}
        <Button 
          variant={isRunning ? 'secondary' : 'primary'}
          onClick={onToggle}
          className={`
            flex-1 h-20 rounded-[2rem] gap-4 relative overflow-hidden
            transition-all duration-300 ease-out
            /* Эффекты ховера */
            hover:scale-[1.02]
            ${isRunning 
              ? 'hover:bg-surface-accent hover:text-text-primary shadow-none' 
              : 'shadow-[0_12px_40px_rgba(59,130,246,0.3)] hover:shadow-[0_15px_50px_rgba(59,130,246,0.5)] hover:brightness-110'
            }
          `}
        >
          <div className="flex items-center justify-center gap-3 relative z-10">
            {isRunning ? (
              <Pause size={30} fill="currentColor" strokeWidth={0} />
            ) : (
              <Play size={30} fill="currentColor" strokeWidth={0} className="ml-1" />
            )}
            <span className="text-xl font-black uppercase italic tracking-[0.1em]">
              {isRunning ? 'Пауза' : 'Старт'}
            </span>
          </div>

          {/* Глянцевый блик, который становится ярче при наведении */}
          <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </Button>
      </div>
    </div>
  );
};
