export const StatBox = ({ count, label, color }: { count: number, label: string, color: string }) => (
  <div className="bg-[#161f35] p-4 rounded-2xl border border-slate-800/50">
    <span className={`block text-2xl font-black ${color} tabular-nums`}>{count}</span>
    <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest">{label}</span>
  </div>
);
