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
    <div className="fixed bottom-0 left-0 right-0 z-50 px-6 pb-10 pt-16 bg-gradient-to-t from-surface-main via-surface-main/90 to-transparent">
      <div className="flex items-center gap-4 w-full max-w-md mx-auto">
        <Button 
          variant="secondary" 
          onClick={onReset}
          className="p-5 group active:rotate-[-120deg] transition-transform duration-500 rounded-[24px]"
          title="Сбросить прогресс"
        >
          <RotateCcw 
            size={24} 
            className="group-hover:text-brand-rose transition-colors" 
          />
        </Button>
        
        <Button 
          variant={isRunning ? 'secondary' : 'primary'}
          onClick={onToggle}
          className="flex-1 py-6 text-lg tracking-[0.2em] shadow-2xl shadow-brand-blue/20 transition-all rounded-[24px]"
        >
          <div className="flex items-center gap-3">
            {isRunning ? (
              <Pause size={26} fill="currentColor" />
            ) : (
              <Play size={26} fill="currentColor" className="ml-1" />
            )}
            <span className="font-black italic uppercase">
              {isRunning ? 'Пауза' : 'Старт'}
            </span>
          </div>
        </Button>
      </div>
    </div>
  );
};
