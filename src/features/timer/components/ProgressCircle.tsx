import React from 'react';

interface ProgressCircleProps {
  remainingTime: number;
  progress: number;
  isResting?: boolean;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({ 
  remainingTime, 
  progress, 
  isResting = false 
}) => {
  const radius = 132;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const styles = {
    text: isResting 
      ? 'text-brand-emerald' 
      : remainingTime > 10 ? 'text-brand-blue' 
      : remainingTime > 5 ? 'text-amber-500' 
      : 'text-brand-rose animate-pulse',
    
    stroke: isResting ? 'text-brand-emerald' : 'text-brand-blue',
    glow: isResting ? 'rgba(16,185,129,0.2)' : 'rgba(59,130,246,0.2)',
    blur: isResting ? 'bg-brand-emerald/10' : 'bg-brand-blue/10'
  };

  return (
    <div className="">
      <div 
        className="" 
      />
      
      <svg 
        className="" 
        style={{ filter: `drop-shadow(0 0 12px ${styles.glow})` }}
        viewBox="0 0 288 288"
      >
        <circle 
          cx="144" cy="144" r={radius} 
          fill="transparent" 
          stroke="currentColor" 
          strokeWidth="12" 
          className="" 
        />
        <circle
          cx="144" cy="144" r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className=""
        />
      </svg>
      
      <div className="">
        <span className="">
          {remainingTime}
        </span>
        <span className="">
          {isResting ? 'отдых' : 'сек.'}
        </span>
      </div>
    </div>
  );
};
