import { Save } from "lucide-react";
import { Button } from "../../../components/ui/Button";

export const FormFooterActions = ({ onCancel }: { onCancel: () => void }) => (
  <div className="sticky bottom-0 left-0 right-0 pt-16 pb-6 px-1 bg-gradient-to-t from-surface-main via-surface-main/95 to-transparent z-40 transition-colors duration-300">
    <div className="flex gap-4 max-w-xl mx-auto">
      <Button 
        type="button" 
        variant="ghost" 
        className="flex-1 py-5" 
        onClick={onCancel}
      >
        Отмена
      </Button>
      
      <Button 
        type="submit" 
        variant="primary" 
        className="flex-[2.5] gap-3 py-5 shadow-2xl shadow-brand-blue/20"
      >
        <Save size={20} className="group-hover:scale-110 transition-transform" /> 
        <span className="font-black italic uppercase tracking-widest">Сохранить</span>
      </Button>
    </div>
  </div>
);
