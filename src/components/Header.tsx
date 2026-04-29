import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Activity } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full flex items-center justify-between py-5 mb-8 border-b border-white/5 bg-[#020617]/50 backdrop-blur-md sticky top-0 z-50">
      <div 
        className="flex items-center gap-3 cursor-pointer group" 
        onClick={() => navigate('/')}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
          <div className="relative bg-blue-600 p-2 rounded-xl shadow-inner">
            <Activity className="text-white" size={24} />
          </div>
        </div>
        
        <div className="flex flex-col">
          <h1 className="text-xl font-black tracking-tight text-white flex items-center">
            SporThick
            <span className="text-blue-500 mx-0.5">.</span>
            <span className="text-slate-400 font-medium">HIIT</span>
          </h1>
          <span className="text-[9px] uppercase tracking-[0.3em] text-slate-500 font-bold leading-none mt-1">
            Maniac Mode
          </span>
        </div>
      </div>

      <button 
        onClick={() => navigate('/create-edit-workout')} 
        className="cursor-pointer group flex items-center gap-2 bg-slate-100 hover:bg-white text-slate-950 px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95 shadow-xl shadow-white/5"
      >
        <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
        <span className="hidden sm:inline">Add Workout</span>
        <span className="sm:hidden">Add</span>
      </button>
    </header>
  );
};

export default Header;
