export const StatBox = ({ icon, value, label }: { icon: React.ReactNode, value: string | number, label: string }) => (
  <div className="bg-surface-card border border-text-muted/10 p-6 rounded-[32px] shadow-sm backdrop-blur-sm transition-colors duration-300">
    <div className="flex justify-center mb-3">{icon}</div>
    <span className="block text-2xl font-black text-text-primary tabular-nums tracking-tighter italic">
      {value}
    </span>
    <span className="text-[10px] text-text-muted uppercase font-black tracking-[0.2em] mt-2 block opacity-60">
      {label}
    </span>
  </div>
);
