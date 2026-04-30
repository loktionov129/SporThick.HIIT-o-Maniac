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
    <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center mb-12 sm:mb-16 select-none transition-all duration-500">
      <div 
        className={`absolute inset-0 ${styles.blur} blur-3xl rounded-full transition-colors duration-1000 opacity-60 dark:opacity-100`} 
      />
      
      <svg 
        className="absolute w-full h-full -rotate-90 transition-all duration-700" 
        style={{ filter: `drop-shadow(0 0 12px ${styles.glow})` }}
        viewBox="0 0 288 288"
      >
        <circle 
          cx="144" cy="144" r={radius} 
          fill="transparent" 
          stroke="currentColor" 
          strokeWidth="12" 
          className="text-surface-accent dark:text-slate-900/40 transition-colors" 
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
        <span className={`text-7xl sm:text-8xl font-black tabular-nums tracking-tighter transition-colors duration-300 ${styles.text}`}>
          {remainingTime}
        </span>
        <span className="text-text-muted font-black uppercase tracking-[0.4em] text-[10px] sm:text-[11px] mt-1 italic opacity-70">
          {isResting ? 'отдых' : 'сек.'}
        </span>
      </div>
    </div>
  );
};
