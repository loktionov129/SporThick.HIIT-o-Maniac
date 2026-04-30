interface StatBoxProps {
  count: number;
  label: string;
  color: string;
}

export const StatBox = ({ count, label, color }: StatBoxProps) => (
  <div className="bg-surface-accent/50 dark:bg-surface-accent p-4 rounded-2xl border border-text-muted/10 transition-colors duration-300">
    <span className={`block text-3xl font-black ${color} tabular-nums tracking-tighter drop-shadow-sm`}>
      {count}
    </span>
    
    <span className="text-[10px] text-text-muted uppercase font-black tracking-widest mt-1 block opacity-80 italic">
      {label}
    </span>
  </div>
);
