import { ArrowLeft } from 'lucide-react';

interface Props {
  round: number;
  totalRounds: number;
  currentEx: number;
  totalEx: number;
  isResting: boolean;
  onBack: () => void;
}

export const TimerHeader = ({ round, totalRounds, currentEx, totalEx, isResting, onBack }: Props) => (
  <div className="w-full absolute -top-4 left-0 flex items-center justify-between">
    <button onClick={onBack} className="p-3 bg-slate-900/50 border border-slate-800 text-slate-400 rounded-2xl active:scale-90 transition-all">
      <ArrowLeft size={20} />
    </button>
    <div className="text-right">
      <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-1">
        Круг {round} из {totalRounds}
      </p>
      <p className="text-blue-500 font-black text-sm italic">
        {isResting ? 'ОТДЫХ' : `УПР. ${currentEx + 1}/${totalEx}`}
      </p>
    </div>
  </div>
);
