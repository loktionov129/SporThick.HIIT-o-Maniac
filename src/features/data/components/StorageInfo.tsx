import React from 'react';
import { Database, ShieldCheck } from 'lucide-react';
import { DataCard } from './DataCard';
import { StatBox } from './StatBox';
import { NavLink } from 'react-router-dom';

interface StorageInfoProps {
  workoutsCount: number;
  historyCount: number;
}


export const StorageInfo: React.FC<StorageInfoProps> = (props) => (
  <DataCard
    title="Хранилище"
    subtitle="Локальная база активна"
    icon={Database}
    bgIcon={ShieldCheck}
    iconBgClass="bg-brand-blue"
    iconColorClass="text-white"
  >
    <div className="grid grid-cols-2 gap-3">
      <NavLink 
        to="/" 
        className="bg-surface-main/50 p-4 rounded-[1.5rem] border border-text-primary/5 cursor-pointer active:scale-95 transition-all hover:bg-surface-accent/50"
      >
        <StatBox count={props.workoutsCount} label="Программ" color="text-brand-blue" />
      </NavLink>
      <NavLink 
        to="/history" 
        className="bg-surface-main/50 p-4 rounded-[1.5rem] border border-text-primary/5 cursor-pointer active:scale-95 transition-all hover:bg-surface-accent/50"
      >
        <StatBox count={props.historyCount} label="Сессий" color="text-brand-emerald" />
      </NavLink>
    </div>
  </DataCard>
);
