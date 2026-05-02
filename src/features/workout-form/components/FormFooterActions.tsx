import { Save, X } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { NavLink } from "react-router-dom";

export const FormFooterActions = () => (
  <div className="sticky bottom-0 left-0 right-0 pt-10 pb-6 px-4 bg-linear-to-t from-surface-main via-surface-main/80 to-transparent z-40">
    <div className="flex items-center gap-4 max-w-md mx-auto">
      <NavLink to="/">
        <Button 
          type="button" 
          variant="danger" 
          className="flex-1 py-4 text-text-muted hover:text-brand-rose transition-colors duration-300 gap-2" 
        >
          <X size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest italic">Отмена</span>
        </Button>
      </NavLink>
      
      <Button 
        type="submit" 
        variant="primary" 
        className="
          flex-[2.5] py-4 gap-3
          transition-all duration-300 ease-out
          hover:brightness-125 
          hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]
          active:scale-95
        "
      >
        <Save size={20} strokeWidth={2.5} /> 
        <span className="text-xs font-black uppercase tracking-[0.2em] italic">Сохранить</span>
      </Button>
    </div>
  </div>
);
