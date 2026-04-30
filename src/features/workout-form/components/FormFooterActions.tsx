import { Save } from "lucide-react";
import { Button } from "../../../components/ui/Button";

export const FormFooterActions = ({ onCancel }: { onCancel: () => void }) => (
  <div className="sticky bottom-0 left-0 right-0 pt-10 pb-4 bg-gradient-to-t from-[#020617] via-[#020617] to-transparent">
    <div className="flex gap-4">
      <Button type="button" variant="ghost" className="flex-1" onClick={onCancel}>Отмена</Button>
      <Button type="submit" variant="primary" className="flex-[2] gap-2">
        <Save size={20} /> Сохранить
      </Button>
    </div>
  </div>
);
