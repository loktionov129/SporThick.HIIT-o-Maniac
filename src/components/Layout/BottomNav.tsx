import React from 'react';
import { NavLink } from 'react-router-dom';
import { Dumbbell, History, SunMoon, DownloadCloud } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const navItems = [
    { to: '/', icon: <Dumbbell size={24} />, label: 'Зал' },
    { to: '/history', icon: <History size={24} />, label: 'История' },
    { to: '/theme', icon: <SunMoon size={24} />, label: 'Тема', isPlaceholder: true },
    { to: '/data', icon: <DownloadCloud size={24} />, label: 'Данные', isPlaceholder: true },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] px-4 pb-6 pt-2 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-transparent">
      <div className="max-w-md mx-auto bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-[24px] p-2 flex items-center justify-around shadow-2xl shadow-black/50">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={item.isPlaceholder ? (e) => e.preventDefault() : undefined}
            className={({ isActive }) => `
              relative flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300
              ${isActive && !item.isPlaceholder ? 'text-blue-500' : 'text-slate-500 hover:text-slate-300'}
              ${item.isPlaceholder ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {({ isActive }) => (
              <>
                {/* Акцентная точка над иконкой */}
                {isActive && !item.isPlaceholder && (
                  <div className="absolute -top-1 w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                )}
                
                <div className={`transition-transform duration-300 ${isActive && !item.isPlaceholder ? 'scale-110' : 'scale-100'}`}>
                  {item.icon}
                </div>
                
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
