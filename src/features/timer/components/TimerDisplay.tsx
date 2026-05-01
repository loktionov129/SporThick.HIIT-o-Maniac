import React from 'react';
import { Zap, Coffee } from 'lucide-react';

interface Props {
  isResting: boolean;
  workoutName: string;
  exerciseName?: string;
}

export const TimerDisplay: React.FC<Props> = ({ isResting, workoutName, exerciseName }) => {
  return (
    <div 
      className="" 
      key={isResting ? 'rest' : 'work'}
    >
      <div className="">
        {isResting ? (
          <Coffee size={18} className="" />
        ) : (
          <Zap size={18} className="" />
        )}
        <span className={`${
          isResting ? 'text-brand-emerald' : 'text-brand-blue'
        }`}>
          {isResting ? 'Перерыв' : workoutName}
        </span>
      </div>
      
      <h2 className={`${
        isResting ? 'text-brand-emerald' : 'text-text-primary'
      }`}>
        {isResting ? 'ОТДЫХАЙ' : exerciseName}
      </h2>
    </div>
  );
};
