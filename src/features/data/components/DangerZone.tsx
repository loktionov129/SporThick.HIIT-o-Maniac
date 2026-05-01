import { Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { DataCard } from "./DataCard";

export const DangerZone = ({ onReset }: { onReset: () => void }) => (
  <DataCard
    title="Полный сброс"
    subtitle="Удалит все программы и историю."
    icon={Trash2}
    bgIcon={Trash2}
    className="bg-brand-rose/5 border-brand-rose/20"
    iconBgClass="bg-brand-rose/20"
    iconColorClass="text-brand-rose"
    bgIconColorClass="text-brand-rose/5"
  >
    <Button variant="danger" onClick={onReset} className="gap-3 w-full py-4 text-xs uppercase font-black italic tracking-widest">
      <Trash2 size={18} /> Стереть данные
    </Button>
  </DataCard>
);

