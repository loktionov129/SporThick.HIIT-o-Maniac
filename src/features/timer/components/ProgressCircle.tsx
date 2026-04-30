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
      ? 'text-emerald-400' 
      : remainingTime > 10 ? 'text-blue-500' 
      : remainingTime > 5 ? 'text-yellow-500' 
      : 'text-red-500 animate-pulse',
    
    stroke: isResting ? 'text-emerald-500' : 'text-blue-500',
    glow: isResting ? 'rgba(16,185,129,0.3)' : 'rgba(59,130,246,0.3)',
    blur: isResting ? 'bg-emerald-600/5' : 'bg-blue-600/5'
  };

  return (
    <div className="relative w-72 h-72 flex items-center justify-center mb-16 select-none">
      <div 
        className={`absolute inset-0 ${styles.blur} blur-3xl rounded-full transition-colors duration-1000`} 
      />
      
      <svg 
        className="absolute w-full h-full -rotate-90 transition-all duration-700" 
        style={{ filter: `drop-shadow(0 0 15px ${styles.glow})` }}
        viewBox="0 0 288 288"
      >
        <circle 
          cx="144" cy="144" r={radius} 
          fill="transparent" 
          stroke="currentColor" 
          strokeWidth="12" 
          className="text-slate-900" 
        />
        <circle
          cx="144" cy="144" r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`${styles.stroke} transition-all duration-1000 ease-linear will-change-[stroke-dashoffset]`}
        />
      </svg>
      
      <div className="flex flex-col items-center relative z-10">
        <span className={`text-8xl font-black tabular-nums tracking-tighter transition-colors duration-300 ${styles.text}`}>
          {remainingTime}
        </span>
        <span className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[11px] mt-1 italic">
          {isResting ? 'отдых' : 'сек.'}
        </span>
      </div>
    </div>
  );
};
