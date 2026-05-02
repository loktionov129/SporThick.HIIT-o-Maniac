import { ArrowLeft } from 'lucide-react';
import { SoundToggle } from '../../../components/ui/SoundToggle';
import { NavLink } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';

interface Props {
  round: number;
  totalRounds: number;
  currentEx: number;
  totalEx: number;
  isResting: boolean;
}

export const TimerHeader = ({ round, totalRounds, currentEx, totalEx, isResting }: Props) => (
  <div className="flex items-center justify-between px-4 py-4 select-none h-20">
    {/* ВЫХОД: юзаем ui/Button, передаем !p-2 чтобы перебить дефолты */}
    <NavLink to="/">
      <Button 
        variant="ghost" 
        className="!p-2 -ml-2 text-text-muted hover:text-text-primary"
        aria-label="Назад"
      >
        <ArrowLeft size={24} strokeWidth={2.5} />
      </Button>
    </NavLink>

    {/* ЦЕНТРАЛЬНЫЙ БЛОК: Статус и Круги */}
    <div className="flex flex-col items-center gap-1.5">
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-muted italic leading-none">
        Круг <span className="text-text-primary">{round}</span> <span className="opacity-20">/</span> {totalRounds}
      </p>
      
      <div className={`
        px-3 py-1.5 rounded-full border transition-all duration-500
        ${isResting 
          ? 'bg-brand-emerald/10 border-brand-emerald/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]' 
          : 'bg-brand-blue/10 border-brand-blue/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
        }
      `}>
        <p className={`
          text-[10px] font-black tracking-widest italic leading-none
          ${isResting ? 'text-brand-emerald' : 'text-brand-blue'}
        `}>
          {isResting ? 'ОТДЫХ' : `УПР. ${currentEx + 1} / ${totalEx}`}
        </p>
      </div>
    </div>

    {/* ЗВУК */}
    <div className="p-2 -mr-2">
      <SoundToggle />
    </div>
  </div>
);
