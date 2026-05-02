import { NavLink } from "react-router-dom";
import { Library } from 'lucide-react';
import { Button } from "@ui/Button";

export const PresetsButton = () => {
  return (
    <NavLink to="/presets">
      <Button 
        variant="secondary"
        className="w-full !p-6 flex items-center gap-5 bg-linear-to-r from-brand-blue/10 to-transparent border-brand-blue/20 hover:border-brand-blue/40 group"
      >
        <div className="size-14 bg-brand-blue rounded-2xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:scale-110 transition-transform">
          <Library size={28} />
        </div>
        <div className="flex flex-col items-start text-left">
          <span className="text-lg font-black uppercase italic tracking-tighter text-text-primary leading-none">
            Библиотека шаблонов
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted mt-1.5">
            Tabata, HIIT, AMRAP
          </span>
        </div>
      </Button>
    </NavLink>
  );
};
