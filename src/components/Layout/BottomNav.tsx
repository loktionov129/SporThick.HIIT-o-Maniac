import React from 'react';
import { Dumbbell, History, Sun, Moon, DownloadCloud } from 'lucide-react';
import { useWorkoutStore, useWorkoutActions } from '../../store/useWorkoutStore';
import { BottomNavItem } from './BottomNavItem';

export const BottomNav: React.FC = () => {
  const theme = useWorkoutStore((s) => s.settings.theme);
  const { toggleTheme } = useWorkoutActions();

  const navItems = [
    { to: '/', icon: <Dumbbell size={24} />, label: 'Зал' },
    { to: '/history', icon: <History size={24} />, label: 'История' },
    { to: '/data', icon: <DownloadCloud size={24} />, label: 'Данные' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] px-4 pb-6 pt-2 bg-gradient-to-t from-surface-main via-surface-main/90 to-transparent">
      <div className="max-w-md mx-auto bg-surface-card/80 backdrop-blur-xl border border-white/5 rounded-[24px] p-2 flex items-center justify-around shadow-2xl shadow-black/50">
        
        {navItems.map((item) => (
          <BottomNavItem key={item.to} {...item} />
        ))}

        <button
          onClick={toggleTheme}
          className="cursor-pointer flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 text-text-muted hover:text-brand-blue active:scale-90"
        >
          <div className="transition-transform duration-500 rotate-0 dark:rotate-[360deg]">
            {theme === 'dark' ? (
              <Moon size={24} className="text-blue-400" />
            ) : (
              <Sun size={24} className="text-amber-500" />
            )}
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest leading-none">
            {theme === 'dark' ? 'Темная' : 'Светлая'}
          </span>
        </button>
      </div>
    </nav>
  );
};

