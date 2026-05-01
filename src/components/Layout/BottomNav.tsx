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
    <nav className="">
      <div className="">
        
        {navItems.map((item) => (
          <BottomNavItem key={item.to} {...item} />
        ))}

        <button
          onClick={toggleTheme}
          className=""
        >
          <div className="">
            {theme === 'dark' ? (
              <Moon size={24} className="" />
            ) : (
              <Sun size={24} className="" />
            )}
          </div>
          <span className="">
            {theme === 'dark' ? 'Темная' : 'Светлая'}
          </span>
        </button>
      </div>
    </nav>
  );
};

