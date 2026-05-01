import { ArrowLeft } from "lucide-react";

export const WorkoutFormHeader = ({ isEdit }: { isEdit: boolean }) => (
  <div className="">
    <button 
      onClick={() => window.history.back()} 
      className=""
      aria-label="Назад"
    >
      <ArrowLeft size={26} strokeWidth={2.5} />
    </button>

    <h2 className="">
      {isEdit ? 'Редактирование' : 'Новая тренировка'}
    </h2>

    <div className="" />
  </div>
);
