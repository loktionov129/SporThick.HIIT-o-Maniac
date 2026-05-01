import { Save } from "lucide-react";
import { Button } from "../../../components/ui/Button";

export const FormFooterActions = ({ onCancel }: { onCancel: () => void }) => (
  <div className="">
    <div className="">
      <Button 
        type="button" 
        variant="ghost" 
        className="" 
        onClick={onCancel}
      >
        Отмена
      </Button>
      
      <Button 
        type="submit" 
        variant="primary" 
        className=""
      >
        <Save size={20} className="" /> 
        <span className="">Сохранить</span>
      </Button>
    </div>
  </div>
);
