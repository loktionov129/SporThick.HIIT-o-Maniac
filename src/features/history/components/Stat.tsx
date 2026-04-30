interface StatProps {
  label: string;
  value: string | number;
  color: string;
}

export const Stat = ({ label, value, color }: StatProps) => (
  <div className="flex flex-col items-end">
    <span className={`${color} font-black tabular-nums text-xl leading-none italic tracking-tighter`}>
      {value}
    </span>
    
    <span className="text-[9px] text-text-muted uppercase font-black tracking-[0.2em] mt-1.5 opacity-60">
      {label}
    </span>
  </div>
);
