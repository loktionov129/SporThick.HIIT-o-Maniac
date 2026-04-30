import { ArrowLeft } from "lucide-react";

export const WorkoutFormHeader = ({ isEdit }: { isEdit: boolean }) => (
  <div className="flex items-center justify-between mb-12 py-2">
    <button onClick={() => window.history.back()} className="p-2 text-slate-400 hover:text-white">
      <ArrowLeft size={24} />
    </button>
    <h2 className="text-xl font-black text-white uppercase tracking-wider text-center flex-1 italic">
      {isEdit ? 'Редактирование' : 'Новая тренировка'}
    </h2>
    <div className="w-10" />
  </div>
);
