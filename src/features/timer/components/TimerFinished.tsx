import React from 'react';
import { Trophy, Clock, RotateCcw } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { FullScreenCenter } from './FullScreenCenter';
import { StatBox } from './StatBox';
import { NavLink } from 'react-router-dom';

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
      <div className="">
        <div className="">
          <div className="" />
          <div className="">
            <Trophy className="" />
          </div>
        </div>

        <h2 className="">
          Победа!
        </h2>
        <p className="">
          Тренировка завершена. Мощный результат!
        </p>

        <div className="">
          <StatBox 
            icon={<Clock className="" size={24} />}
            value={formatTime(totalTime)}
            label="Время"
          />
          <StatBox 
            icon={<RotateCcw className="" size={24} />}
            value={totalRounds}
            label="Кругов"
          />
        </div>

        <NavLink to="/history">
          <Button 
            fullWidth 
            variant="primary" 
            className=""
          >
            Завершить
          </Button>
        </NavLink>
      </div>
    </FullScreenCenter>
  );
};

