import { Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/Button";

export const DangerZone = ({ onReset }: { onReset: () => void }) => (
  <div className="">
    <div className="">
      <div className="" />
      <label className="">
        Factory Reset
      </label>
    </div>

    <div className="">
      <Trash2 
        size={120} 
        className="" 
      />
      
      <div className="">
        <div className="">
          <h4 className="">
            Полный сброс приложения
          </h4>
          <p className="">
            Удалит все созданные программы и накопленную историю. 
            <span className="">
              Это действие невозможно отменить
            </span>
          </p>
        </div>
        
        <Button 
          variant="danger" 
          onClick={onReset}
          className=""
        >
          <Trash2 size={18} />
          Стереть данные
        </Button>
      </div>
    </div>
  </div>
);
