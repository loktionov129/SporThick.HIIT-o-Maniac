import { Database, ShieldCheck } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { StatBox } from './StatBox';

interface Props {
  workoutsCount: number;
  historyCount: number;
}

export const StorageInfo = ({ workoutsCount, historyCount }: Props) => (
  <Card className="">
    <ShieldCheck 
      size={140} 
      className="" 
    />
    
    <header className="">
      <div className="">
        <Database className="" size={24} />
      </div>
      
      <div>
        <h3 className="">
          Локальное хранилище
        </h3>
        <p className="">
          Данные только в этом браузере
        </p>
      </div>
    </header>

    <div className="">
      <StatBox count={workoutsCount} label="Программ" color="text-brand-blue" />
      <StatBox count={historyCount} label="Сессий" color="text-brand-emerald" />
    </div>
  </Card>
);
