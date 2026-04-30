interface ConfigCardProps {
  label: string;
  subLabel: string;
  children: React.ReactNode;
}

export const ConfigCard = ({ label, subLabel, children }: ConfigCardProps) => (
  <div className="bg-surface-card/50 dark:bg-surface-accent/20 border border-text-muted/10 p-5 rounded-[24px] flex items-center justify-between transition-colors duration-300">
    <div className="space-y-1">
      <label className="text-[10px] uppercase tracking-[0.25em] text-text-muted font-black italic block">
        {label}
      </label>
      <p className="text-[9px] text-text-muted/60 uppercase font-black tracking-tighter italic">
        {subLabel}
      </p>
    </div>
    
    <div className="relative z-10">
      {children}
    </div>
  </div>
);
