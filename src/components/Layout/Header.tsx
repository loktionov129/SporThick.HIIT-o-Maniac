import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { SoundToggle } from '../ui/SoundToggle';

export const Header: React.FC = () => {
  const navigate = useNavigate();

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

        <SoundToggle />
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-text-muted/10 to-transparent" />
    </header>
  );
};
