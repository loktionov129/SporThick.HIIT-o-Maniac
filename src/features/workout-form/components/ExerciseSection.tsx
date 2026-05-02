import { Plus, ListChecks } from "lucide-react";
import { Button } from "@ui/Button";
import { ExerciseList } from "./ExerciseList";

interface ExerciseSectionProps {
  exercises: any[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: 'name' | 'duration', value: string | number) => void;
  onDragEnd: (result: any) => void;
}

export const ExerciseSection = ({ 
  exercises, 
  onAdd, 
  onRemove, 
  onUpdate, 
  onDragEnd 
}: ExerciseSectionProps) => (
  <div className="space-y-6">
    {/* Шапка секции: Заголовок + Счет */}
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center gap-2.5">
        <div className="size-1.5 bg-brand-blue rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-text-primary/60 dark:text-text-muted italic leading-none">
          Упражнения
        </label>
      </div>
      
      <div className="flex items-center gap-1.5 bg-brand-blue/5 px-2 py-1 rounded-lg border border-brand-blue/10">
        <ListChecks size={10} className="text-brand-blue" />
        <span className="text-[10px] font-black text-brand-blue italic tabular-nums leading-none">
          {exercises.length}
        </span>
      </div>
    </div>

    {/* Список упражнений с DND */}
    <ExerciseList 
      exercises={exercises} 
      onDragEnd={onDragEnd}
      onUpdate={onUpdate}
      onRemove={onRemove}
    />

    {/* Кнопка "Добавить": Делаем её вторичной, но заметной */}
    <Button 
      type="button" 
      onClick={onAdd} 
      variant="secondary"
      fullWidth
      className="
        group py-4 border-dashed border-2 border-text-primary/10 
        hover:border-brand-blue/30 hover:bg-brand-blue/5 
        transition-all duration-300 gap-3
      "
    >
      <div className="size-6 bg-brand-blue/10 text-brand-blue rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
        <Plus size={16} strokeWidth={3} />
      </div>
      <span className="text-[10px] font-black uppercase tracking-[0.2em] italic text-text-primary/70 group-hover:text-brand-blue transition-colors">
        Добавить упражнение
      </span>
    </Button>
  </div>
);
