import { Plus } from "lucide-react";
import { ExerciseList } from "./ExerciseList";

export const ExerciseSection = ({ exercises, onAdd, onRemove, onUpdate, onDragEnd }: any) => (
  <div className="space-y-5">
    <div className="flex items-center justify-between px-2">
      <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold italic">Упражнения</label>
      <span className="text-[10px] text-blue-500 font-black uppercase tracking-widest">{exercises.length} всего</span>
    </div>

    <ExerciseList 
      exercises={exercises} 
      onDragEnd={onDragEnd}
      onUpdate={onUpdate}
      onRemove={onRemove}
    />

    <button type="button" onClick={onAdd} className="w-full py-5 border-2 border-dashed border-slate-800/60 rounded-[20px] text-slate-500 font-bold flex items-center justify-center gap-2 hover:border-blue-500/30 transition-all bg-[#0b1224]/20">
      <Plus size={18} /> Добавить упражнение
    </button>
  </div>
);
