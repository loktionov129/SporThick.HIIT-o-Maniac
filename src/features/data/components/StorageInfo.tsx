import { Database, ShieldCheck } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { StatBox } from './StatBox';

interface Props {
  workoutsCount: number;
  historyCount: number;
}

export const StorageInfo = ({ workoutsCount, historyCount }: Props) => (
  <Card className="!bg-blue-600/5 border-blue-500/20 p-6 relative overflow-hidden text-left">
    <ShieldCheck size={120} className="absolute -right-8 -top-8 text-blue-500/10 rotate-12" />
    <header className="flex items-center gap-4 mb-6 relative z-10">
      <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/20">
        <Database className="text-white" size={24} />
      </div>
      <div>
        <h3 className="text-white font-bold uppercase text-xs tracking-widest">Локальное хранилище</h3>
        <p className="text-slate-500 text-[10px] font-medium uppercase mt-0.5">Данные только в этом браузере</p>
      </div>
    </header>
    <div className="grid grid-cols-2 gap-4 relative z-10">
      <StatBox count={workoutsCount} label="Программ" color="text-blue-500" />
      <StatBox count={historyCount} label="Сессий" color="text-emerald-500" />
    </div>
  </Card>
);
