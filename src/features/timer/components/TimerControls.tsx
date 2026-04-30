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
    <div className="flex items-center gap-4 w-full max-w-sm mt-8">
      <Button 
        variant="secondary" 
        onClick={onReset}
        className="p-5 active:rotate-[-45deg] transition-transform duration-200"
        title="Сбросить прогресс"
      >
        <RotateCcw size={24} />
      </Button>
      
      <Button 
        variant={isRunning ? 'secondary' : 'primary'}
        onClick={onToggle}
        className="flex-1 py-5 text-lg uppercase font-black tracking-[0.2em] shadow-xl active:scale-95 transition-all"
      >
        <div className="flex items-center gap-3">
          {isRunning ? (
            <Pause size={24} fill="currentColor" />
          ) : (
            <Play size={24} fill="currentColor" className="ml-1" />
          )}
          <span>{isRunning ? 'Пауза' : 'Старт'}</span>
        </div>
      </Button>
    </div>
  );
};
