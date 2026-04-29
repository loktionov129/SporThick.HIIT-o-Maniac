import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Activity } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-xl">
      <div className="flex items-center justify-between py-6">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => navigate('/')}
        >
          {/* Лого с мягким свечением */}
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
          onClick={() => navigate('/create-edit-workout')} 
          className="cursor-pointer group flex items-center gap-2.5 bg-white text-slate-950 px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 hover:bg-blue-50 hover:scale-[1.02] active:scale-95 shadow-2xl shadow-white/5"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform duration-500" />
          <span className="hidden sm:inline">Add Workout</span>
        </button>
      </div>

      {/* Та самая "черточка" — стильный градиентный разделитель */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent opacity-50" />
    </header>
  );
};

export default Header;
