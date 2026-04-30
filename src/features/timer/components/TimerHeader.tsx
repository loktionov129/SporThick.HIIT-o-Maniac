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
  <div className="w-full absolute -top-4 left-0 flex items-center justify-between px-2 transition-colors duration-300">
    <button 
      onClick={onBack} 
      className="cursor-pointer p-3.5 bg-surface-accent/80 backdrop-blur-md border border-text-muted/10 text-text-muted hover:text-text-primary rounded-2xl active:scale-90 transition-all shadow-sm"
      aria-label="Назад"
    >
      <ArrowLeft size={20} strokeWidth={2.5} />
    </button>

    <div className="text-right space-y-0.5">
      <p className="text-text-muted font-black uppercase tracking-[0.2em] text-[10px] opacity-70 italic">
        Круг {round} <span className="opacity-40">/</span> {totalRounds}
      </p>
      
      <p className="text-brand-blue font-black text-sm uppercase tracking-wider italic leading-none">
        {isResting ? (
          <span className="text-brand-emerald">ОТДЫХ</span>
        ) : (
          `УПР. ${currentEx + 1} / ${totalEx}`
        )}
      </p>
    </div>
  </div>
);
