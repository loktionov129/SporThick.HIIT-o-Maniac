import { ArrowLeft } from 'lucide-react';
import { SoundToggle } from '../../../components/ui/SoundToggle';
import { NavLink } from 'react-router-dom';

interface Props {
  round: number;
  totalRounds: number;
  currentEx: number;
  totalEx: number;
  isResting: boolean;
}

export const TimerHeader = ({ round, totalRounds, currentEx, totalEx, isResting }: Props) => (
  <div className="">
    <NavLink to="/">
      <button className="" aria-label="Назад">
        <ArrowLeft size={22} strokeWidth={2.5} />
      </button>
    </NavLink>

    <div className="">
      <p className="">
        Круг {round} <span className="">/</span> {totalRounds}
      </p>
      
      <div className={`${
        isResting ? 'bg-brand-emerald/10 border-brand-emerald/20' : 'bg-brand-blue/10 border-brand-blue/20'
      }`}>
        <p className={`${
          isResting ? 'text-brand-emerald' : 'text-brand-blue'
        }`}>
          {isResting ? 'ОТДЫХ' : `УПР. ${currentEx + 1} / ${totalEx}`}
        </p>
      </div>
    </div>

    <SoundToggle className="" />
  </div>
);
