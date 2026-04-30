import { Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/Button";

export const DangerZone = ({ onReset }: { onReset: () => void }) => (
  <div className="pt-10 space-y-4 text-left">
    <div className="flex items-center gap-2 px-2">
      <div className="w-2 h-2 bg-brand-rose rounded-full shadow-[0_0_12px_rgba(244,63,94,0.6)] animate-pulse" />
      <label className="text-[11px] font-black uppercase text-brand-rose tracking-[0.25em] italic">
        Factory Reset
      </label>
    </div>

    <div className="relative group overflow-hidden rounded-[32px] border border-brand-rose/20 bg-brand-rose/[0.03] dark:bg-brand-rose/[0.05] backdrop-blur-md p-8 transition-all hover:border-brand-rose/40">
      <Trash2 
        size={120} 
        className="absolute -right-6 -bottom-6 text-brand-rose/5 dark:text-brand-rose/[0.03] -rotate-12 pointer-events-none transition-transform group-hover:scale-110 duration-700" 
      />
      
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
        <div className="space-y-3">
          <h4 className="text-text-primary font-black uppercase text-base tracking-wider italic">
            Полный сброс приложения
          </h4>
          <p className="text-[12px] text-text-muted leading-relaxed max-w-[320px]">
            Удалит все созданные программы и накопленную историю. 
            <span className="text-brand-rose font-bold block mt-2 uppercase text-[10px] tracking-widest italic">
              Это действие невозможно отменить
            </span>
          </p>
        </div>
        
        <Button 
          variant="danger" 
          onClick={onReset}
          className="py-4 px-8 min-w-[180px]"
        >
          <Trash2 size={18} />
          Стереть данные
        </Button>
      </div>
    </div>
  </div>
);
