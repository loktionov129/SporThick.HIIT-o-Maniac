import { ArrowLeft } from 'lucide-react';
import { SoundToggle } from '../../../components/ui/SoundToggle';

interface Props {
  round: number;
  totalRounds: number;
  currentEx: number;
  totalEx: number;
  isResting: boolean;
  onBack: () => void;
}

export const TimerHeader = ({ round, totalRounds, currentEx, totalEx, isResting, onBack }: Props) => (
  <div className="w-full flex items-center justify-between mb-6 sm:mb-10 transition-colors duration-300">
    <button 
      onClick={onBack} 
      className="cursor-pointer p-3 bg-surface-accent/50 backdrop-blur-md border border-text-muted/10 text-text-muted hover:text-text-primary rounded-2xl active:scale-90 transition-all"
      aria-label="Назад"
    >
      <ArrowLeft size={22} strokeWidth={2.5} />
    </button>

    <div className="flex flex-col items-center text-center">
      <p className="text-text-muted font-black uppercase tracking-[0.2em] text-[10px] opacity-60 italic mb-1">
        Круг {round} <span className="opacity-40">/</span> {totalRounds}
      </p>
      
      <div className={`px-4 py-1.5 rounded-full border shadow-lg transition-colors duration-500 ${
        isResting ? 'bg-brand-emerald/10 border-brand-emerald/20' : 'bg-brand-blue/10 border-brand-blue/20'
      }`}>
        <p className={`font-black text-[11px] uppercase tracking-widest italic leading-none ${
          isResting ? 'text-brand-emerald' : 'text-brand-blue'
        }`}>
          {isResting ? 'ОТДЫХ' : `УПР. ${currentEx + 1} / ${totalEx}`}
        </p>
      </div>
    </div>

    <SoundToggle className="!bg-surface-accent/50 backdrop-blur-md !border-text-muted/10 shadow-sm" />
  </div>
);
