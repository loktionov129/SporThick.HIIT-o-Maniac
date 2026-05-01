import { Plus } from "lucide-react";
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
  <div className="">
    <div className="">
      <label className="">
        Упражнения
      </label>
      <span className="">
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
      className=""
    >
      <div className="">
        <Plus size={16} className="" />
      </div>
      Добавить упражнение
    </button>
  </div>
);
