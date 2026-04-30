import { ArrowLeft } from "lucide-react";

export const WorkoutFormHeader = ({ isEdit }: { isEdit: boolean }) => (
  <div className="flex items-center justify-between mb-10 sm:mb-12 py-2 transition-colors duration-300">
    <button 
      onClick={() => window.history.back()} 
      className="cursor-pointer p-2 text-text-muted hover:text-brand-blue transition-all active:scale-90"
      aria-label="Назад"
    >
      <ArrowLeft size={26} strokeWidth={2.5} />
    </button>

    <h2 className="text-xl sm:text-2xl font-black text-text-primary uppercase tracking-wider text-center flex-1 italic">
      {isEdit ? 'Редактирование' : 'Новая тренировка'}
    </h2>

    <div className="w-10" />
  </div>
);
