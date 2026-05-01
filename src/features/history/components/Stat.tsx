interface StatProps {
  label: string;
  value: string | number;
  color: string;
}

export const Stat = ({ label, value, color }: StatProps) => (
  <div className="flex flex-col">
    <span className={`text-2xl font-black italic leading-none tracking-tighter ${color}`}>
      {value}
    </span>
    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-muted mt-1 opacity-70">
      {label}
    </span>
  </div>
);
