import React from 'react';

interface ProgressCircleProps {
  remainingTime: number;
  progress: number;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({ remainingTime, progress }) => {
  return (
    <div className="relative w-72 h-72 flex items-center justify-center mb-16">
      <div className="absolute inset-0 bg-blue-600/5 blur-3xl rounded-full" />
      <svg className="absolute w-full h-full -rotate-90 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]" viewBox="0 0 288 288">
        <circle cx="144" cy="144" r="132" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-slate-900" />
        <circle
          cx="144" cy="144" r="132"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="12"
          strokeDasharray={829}
          strokeDashoffset={829 - (829 * progress) / 100}
          className="text-blue-500 transition-all duration-1000 ease-linear"
          strokeLinecap="round"
        />
      </svg>
      
      <div className="flex flex-col items-center relative z-10">
        <span className="text-8xl font-black text-white tabular-nums tracking-tighter">
          {remainingTime}
        </span>
        <span className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[11px] mt-1">сек.</span>
      </div>
    </div>
  );
};
