import { Zap } from 'lucide-react';

const intensityStyles = {
  light: { label: 'Light', color: 'text-brand-emerald', bg: 'bg-brand-emerald/10' },
  standard: { label: 'Standard', color: 'text-brand-blue', bg: 'bg-brand-blue/10' },
  extreme: { label: 'Extreme', color: 'text-brand-rose', bg: 'bg-brand-rose/10' }
};

export const WorkoutIntensityBadge = ({ intensity }: { intensity: keyof typeof intensityStyles }) => {
  const style = intensityStyles[intensity];
  return (
    <div className={`flex items-center gap-1.5 shrink-0 ${style.bg} ${style.color} px-3 py-1.5 rounded-xl border border-current/10 shadow-sm`}>
      <Zap size={12} fill="currentColor" />
      <span className="text-[10px] font-black uppercase tracking-widest italic leading-none">
        {style.label}
      </span>
    </div>
  );
};
