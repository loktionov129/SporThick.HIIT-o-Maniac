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
  const getTimeColor = () => {
    if (isResting) return 'text-emerald-400';
    if (remainingTime > 10) return 'text-blue-500';
    if (remainingTime > 5) return 'text-yellow-500';
    return 'text-red-500 animate-pulse';
  };

  const strokeColor = isResting ? 'text-emerald-500' : 'text-blue-500';
  const glowColor = isResting ? 'rgba(16,185,129,0.3)' : 'rgba(59,130,246,0.3)';
  const blurBg = isResting ? 'bg-emerald-600/5' : 'bg-blue-600/5';

  return (
    <div className="relative w-72 h-72 flex items-center justify-center mb-16">
      <div className={`absolute inset-0 ${blurBg} blur-3xl rounded-full transition-colors duration-500`} />
      
      <svg 
        className="absolute w-full h-full -rotate-90 transition-all duration-500" 
        style={{ filter: `drop-shadow(0 0 15px ${glowColor})` }}
        viewBox="0 0 288 288"
      >
        <circle 
          cx="144" 
          cy="144" 
          r="132" 
          fill="transparent" 
          stroke="currentColor" 
          strokeWidth="12" 
          className="text-slate-900" 
        />
        <circle
          cx="144" 
          cy="144" 
          r="132"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="12"
          strokeDasharray={829}
          strokeDashoffset={829 - (829 * progress) / 100}
          className={`${strokeColor} transition-all duration-1000 ease-linear`}
          strokeLinecap="round"
        />
      </svg>
      
      <div className="flex flex-col items-center relative z-10">
        <span className={`text-8xl font-black tabular-nums tracking-tighter transition-colors duration-300 ${getTimeColor()}`}>
          {remainingTime}
        </span>
        <span className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[11px] mt-1 italic">
          {isResting ? 'отдых' : 'сек.'}
        </span>
      </div>
    </div>
  );
};
