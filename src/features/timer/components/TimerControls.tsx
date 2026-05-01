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
    <div className="">
      <div className="">
        <Button 
          variant="secondary" 
          onClick={onReset}
          className=""
          title="Сбросить прогресс"
        >
          <RotateCcw 
            size={24} 
            className="" 
          />
        </Button>
        
        <Button 
          variant={isRunning ? 'secondary' : 'primary'}
          onClick={onToggle}
          className=""
        >
          <div className="">
            {isRunning ? (
              <Pause size={26} fill="currentColor" />
            ) : (
              <Play size={26} fill="currentColor" className="" />
            )}
            <span className="">
              {isRunning ? 'Пауза' : 'Старт'}
            </span>
          </div>
        </Button>
      </div>
    </div>
  );
};
