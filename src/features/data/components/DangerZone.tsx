import { Trash2 } from "lucide-react";

export const DangerZone = ({ onReset }: { onReset: () => void }) => (
  <div className="pt-10 space-y-4 text-left">
    <div className="flex items-center gap-2 px-2">
      <div className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.8)]" />
      <label className="text-[11px] font-black uppercase text-red-500 tracking-[0.25em]">Factory Reset</label>
    </div>
    <div className="relative group overflow-hidden rounded-[32px] border border-red-500/20 bg-red-500/[0.03] backdrop-blur-md p-8 transition-all hover:border-red-500/40">
      <Trash2 size={120} className="absolute -right-6 -bottom-6 text-red-500/[0.04] -rotate-12 pointer-events-none transition-transform group-hover:scale-110 duration-700" />
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-3">
          <h4 className="text-white font-black uppercase text-base tracking-wider">Полный сброс приложения</h4>
          <p className="text-[12px] text-slate-400 leading-relaxed max-w-[320px]">
            Удалит все программы и историю. <span className="text-red-500 font-bold block mt-2 uppercase text-[10px] italic">Это действие невозможно отменить</span>
          </p>
        </div>
        <button onClick={onReset} className="cursor-pointer group/btn relative flex items-center justify-center gap-3 bg-red-500/10 hover:bg-red-500 border border-red-500/20 text-red-500 hover:text-white px-8 py-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.15em] transition-all active:scale-95 shadow-xl shadow-red-500/5">
          <Trash2 size={18} />
          Стереть данные
        </button>
      </div>
    </div>
  </div>
);
