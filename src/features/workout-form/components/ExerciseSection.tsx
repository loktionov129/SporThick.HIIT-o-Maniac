import { Plus } from "lucide-react";
import { ExerciseList } from "./ExerciseList";

interface ExerciseSectionProps {
  exercises: any[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: string, value: any) => void;
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
    <div className="flex items-center justify-between px-2">
      <label className="text-[11px] uppercase tracking-[0.25em] text-text-muted font-black italic">
        Упражнения
      </label>
      <span className="text-[10px] text-brand-blue font-black uppercase tracking-widest bg-brand-blue/10 px-3 py-1 rounded-full">
        {exercises.length} всего
      </span>
    </div>

    <ExerciseList 
      exercises={exercises} 
      onDragEnd={onDragEnd}
      onUpdate={onUpdate}
      onRemove={onRemove}
    />

    <button 
      type="button" 
      onClick={onAdd} 
      className={`
        w-full py-6 border-2 border-dashed rounded-[24px] 
        flex items-center justify-center gap-3 transition-all duration-300
        font-black uppercase text-[11px] tracking-[0.2em]
        
        /* Цвета для темной и светлой темы */
        bg-surface-accent/20 border-text-muted/20 text-text-muted
        hover:bg-brand-blue/5 hover:border-brand-blue/40 hover:text-brand-blue
        active:scale-[0.98]
      `}
    >
      <div className="p-1 bg-current rounded-lg">
        <Plus size={16} className="text-surface-main" />
      </div>
      Добавить упражнение
    </button>
  </div>
);
