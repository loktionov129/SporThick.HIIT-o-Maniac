import { Database, ShieldCheck } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { StatBox } from './StatBox';

interface Props {
  workoutsCount: number;
  historyCount: number;
}

export const StorageInfo = ({ workoutsCount, historyCount }: Props) => (
  <Card className="relative overflow-hidden text-left border-brand-blue/20 bg-brand-blue/[0.03] dark:bg-brand-blue/[0.05]">
    <ShieldCheck 
      size={140} 
      className="absolute -right-10 -top-10 text-brand-blue/5 dark:text-brand-blue/[0.07] rotate-12 pointer-events-none" 
    />
    
    <header className="flex items-center gap-4 mb-6 relative z-10">
      <div className="p-3 bg-brand-blue rounded-2xl shadow-lg shadow-brand-blue/30 transition-transform hover:scale-105 duration-300">
        <Database className="text-white" size={24} />
      </div>
      
      <div>
        <h3 className="text-text-primary font-black uppercase text-[11px] tracking-[0.2em] italic">
          Локальное хранилище
        </h3>
        <p className="text-text-muted text-[10px] font-bold uppercase mt-1 opacity-70">
          Данные только в этом браузере
        </p>
      </div>
    </header>

    <div className="grid grid-cols-2 gap-4 relative z-10">
      <StatBox count={workoutsCount} label="Программ" color="text-brand-blue" />
      <StatBox count={historyCount} label="Сессий" color="text-brand-emerald" />
    </div>
  </Card>
);
