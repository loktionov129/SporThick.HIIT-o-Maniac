export const ConfigCard = ({ label, subLabel, children }: { label: string; subLabel: string; children: React.ReactNode }) => (
  <div className="bg-[#0b1224]/50 border border-slate-800/60 p-5 rounded-[24px] flex items-center justify-between">
    <div className="space-y-0.5">
      <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">{label}</label>
      <p className="text-[9px] text-slate-600 uppercase font-bold tracking-tighter">{subLabel}</p>
    </div>
    {children}
  </div>
);
