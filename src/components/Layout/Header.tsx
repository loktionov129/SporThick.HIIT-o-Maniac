import React from 'react';
import { Activity } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { SoundToggle } from '@ui/SoundToggle';

export const Header: React.FC = () => {

  return (
    <header className="w-full bg-surface-main px-6 pt-6 pb-4 shrink-0 transition-colors duration-300">
      <div className="flex items-center justify-between">
        
        <NavLink to="/"
          className="flex items-center gap-3 cursor-pointer active:scale-95 transition-transform" 
        >
          <div className="relative">
            <div className="absolute inset-0 bg-brand-blue blur-xl opacity-20 rounded-full" />
            <div className="relative size-11 bg-brand-blue rounded-xl flex items-center justify-center text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]">
              <Activity size={24} strokeWidth={3} />
            </div>
          </div>
          
          <div className="flex flex-col">
            <h1 className="text-3xl font-black italic uppercase tracking-tighter leading-none text-text-primary">
              SporThick
              <span className="text-brand-blue ml-0.5">.</span>
              <span className="text-[10px] not-italic text-text-muted ml-1 align-top">HIIT</span>
            </h1>
            <span className="text-[10px] font-bold tracking-[0.3em] text-text-muted uppercase italic mt-1.5">
              HIIT-o-Maniac
            </span>
          </div>
        </NavLink>

        {/* Переключатель звука */}
        <SoundToggle />
      </div>

      <div className="h-px w-full bg-text-primary/5 mt-4" />
    </header>
  );
};
