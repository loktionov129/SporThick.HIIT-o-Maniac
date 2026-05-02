import React from 'react';
import { Dumbbell, History, Sun, Moon, DownloadCloud } from 'lucide-react';
import { useWorkoutStore, useWorkoutActions } from '@store/useWorkoutStore';
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
    <nav className="h-24 w-full bg-surface-card/80 backdrop-blur-xl border-t border-text-primary/5 px-8 flex items-center shrink-0">
      <div className="flex w-full justify-between items-center max-w-md mx-auto">
        
        {navItems.map((item) => (
          <BottomNavItem key={item.to} {...item} />
        ))}

        <button
          onClick={toggleTheme}
          className="flex flex-col items-center gap-1.5 cursor-pointer text-text-muted hover:text-text-primary transition-colors active:scale-90"
        >
          <div className="transition-transform duration-200">
            {theme === 'dark' ? <Moon size={24} /> : <Sun size={24} />}
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.15em] leading-none">
            {theme === 'dark' ? 'Тьма' : 'Свет'}
          </span>
        </button>
      </div>
    </nav>
  );
};
