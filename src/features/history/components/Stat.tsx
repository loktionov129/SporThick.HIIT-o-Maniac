export const Stat = ({ label, value, color }: { label: string; value: string | number; color: string }) => (
  <div className="flex flex-col items-end">
    <span className={`${color} font-black tabular-nums text-lg leading-none`}>{value}</span>
    <span className="text-[8px] text-slate-600 uppercase font-black tracking-widest mt-1.5">{label}</span>
  </div>
);
