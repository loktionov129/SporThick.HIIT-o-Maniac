import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Volume2, VolumeX } from 'lucide-react';
import { useWorkoutActions, useWorkoutStore } from '../../store/useWorkoutStore';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { toggleSound } = useWorkoutActions();
  const soundEnabled = useWorkoutStore((s) => s.settings.soundEnabled);

  return (
    <header className="w-full sticky top-0 z-50 bg-surface-main/80 backdrop-blur-xl transition-colors duration-300">
      <div className="flex items-center justify-between py-5">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => navigate('/')}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-brand-blue blur-xl opacity-20 dark:opacity-40 group-hover:opacity-60 transition-opacity" />
            <div className="relative bg-brand-blue p-2.5 rounded-2xl shadow-lg shadow-brand-blue/20">
              <Activity className="text-white" size={24} />
            </div>
          </div>
          
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tighter text-text-primary flex items-center leading-none italic">
              SporThick
              <span className="text-brand-blue mx-0.5">.</span>
              <span className="text-text-muted font-semibold text-lg not-italic uppercase">HIIT</span>
            </h1>
            <span className="text-[9px] uppercase tracking-[0.4em] text-text-muted font-black mt-1.5 opacity-80">
              Maniac Mode
            </span>
          </div>
        </div>

        <button 
          onClick={toggleSound}
          className={`
            cursor-pointer relative flex items-center justify-center p-3 rounded-2xl transition-all duration-300 active:scale-90 border
            ${soundEnabled 
              ? 'bg-brand-blue/10 border-brand-blue/20 text-brand-blue shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
              : 'bg-surface-accent border-surface-card text-text-muted'}
          `}
          title={soundEnabled ? "Выключить звук" : "Включить звук"}
        >
          {soundEnabled ? (
            <div className="relative">
               <div className="absolute inset-0 blur-md bg-brand-blue/50" />
               <Volume2 size={22} className="relative z-10" />
            </div>
          ) : (
            <VolumeX size={22} />
          )}
        </button>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-text-muted/10 to-transparent" />
    </header>
  );
};
