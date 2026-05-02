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
    <div className="relative flex items-center justify-center select-none group">
      {/* 1. ФОНОВОЕ СВЕЧЕНИЕ (Глубина) */}
      <div className={`absolute inset-0 rounded-full blur-[80px] transition-colors duration-1000 ${styles.blur}`} />
      
      {/* 2. SVG КОЛЬЦО */}
      <svg 
        className="relative z-10 size-[288px] -rotate-90 transition-all duration-300" 
        style={{ filter: `drop-shadow(0 0 12px ${styles.glow})` }}
        viewBox="0 0 288 288"
      >
        {/* Фоновая дорожка (недозаполненное кольцо) */}
        <circle 
          cx="144" cy="144" r={radius} 
          fill="transparent" 
          stroke="currentColor" 
          strokeWidth="10" 
          className="text-text-primary/5" 
        />
        
        {/* Активный прогресс */}
        <circle
          cx="144" cy="144" r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          /* transition-all duration-1000 ease-linear делает движение кольца абсолютно плавным */
          className={`transition-all duration-1000 ease-linear ${styles.stroke}`}
        />
      </svg>
      
      {/* 3. ЦИФРЫ ВНУТРИ: Максимальный фокус */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pt-2">
        <span className={`
          text-[110px] font-black italic leading-none tracking-tighter tabular-nums
          transition-colors duration-500
          ${styles.text}
        `}>
          {remainingTime}
        </span>
        
        <span className={`
          text-[10px] font-black uppercase tracking-[0.5em] italic -mt-2 opacity-40
          ${isResting ? 'text-brand-emerald' : 'text-text-primary'}
        `}>
          {isResting ? 'отдых' : 'сек.'}
        </span>
      </div>
    </div>
  );
};
