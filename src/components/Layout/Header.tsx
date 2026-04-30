import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Volume2, VolumeX } from 'lucide-react'; // Добавили иконки звука
import { useWorkoutStore } from '../../store/useWorkoutStore'; // Подключаем стор

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { settings, toggleSound } = useWorkoutStore(); // Достаем логику звука

  return (
    <header className="w-full sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-xl">
      <div className="flex items-center justify-between py-6">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => navigate('/')}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
            <div className="relative bg-blue-600 p-2.5 rounded-2xl shadow-lg shadow-blue-600/20">
              <Activity className="text-white" size={24} />
            </div>
          </div>
          
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tighter text-white flex items-center leading-none">
              SporThick
              <span className="text-blue-500 mx-0.5">.</span>
              <span className="text-slate-400 font-semibold text-lg">HIIT</span>
            </h1>
            <span className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black mt-1.5 opacity-80">
              Maniac Mode
            </span>
          </div>
        </div>

        <button 
          onClick={toggleSound}
          className={`
            cursor-pointer relative flex items-center justify-center p-3 rounded-2xl transition-all duration-300 active:scale-90 border
            ${settings.soundEnabled 
              ? 'bg-blue-600/10 border-blue-500/20 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
              : 'bg-slate-900/50 border-slate-800 text-slate-500'}
          `}
          title={settings.soundEnabled ? "Выключить звук" : "Включить звук"}
        >
          {settings.soundEnabled ? (
            <div className="relative">
               <div className="absolute inset-0 blur-md bg-blue-500/50" />
               <Volume2 size={22} className="relative z-10" />
            </div>
          ) : (
            <VolumeX size={22} />
          )}
        </button>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent opacity-50" />
    </header>
  );
};
