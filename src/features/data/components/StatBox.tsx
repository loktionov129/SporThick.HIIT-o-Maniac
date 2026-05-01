interface StatBoxProps {
  count: number;
  label: string;
  color: string;
}

export const StatBox = ({ count, label, color }: StatBoxProps) => (
  <div className="flex flex-col items-center justify-center w-full">
    <span className={`text-4xl font-black italic leading-none tracking-tighter ${color}`}>
      {count}
    </span>
    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted mt-2 opacity-80">
      {label}
    </span>
  </div>
);

