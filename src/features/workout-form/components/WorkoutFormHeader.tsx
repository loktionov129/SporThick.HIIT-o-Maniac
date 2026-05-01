import { ArrowLeft } from "lucide-react";
import { NavLink } from "react-router-dom";

export const WorkoutFormHeader = ({ isEdit }: { isEdit: boolean }) => (
  <div className="">
    <NavLink to="/">
      <button 
        className=""
        aria-label="Назад"
      >
        <ArrowLeft size={26} strokeWidth={2.5} />
      </button>
    </NavLink>

    <h2 className="">
      {isEdit ? 'Редактирование' : 'Новая тренировка'}
    </h2>

    <div className="" />
  </div>
);
