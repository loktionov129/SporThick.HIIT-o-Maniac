import { Coffee, ListChecks, RefreshCw, Timer } from "lucide-react";
import { formatDuration } from "../../../utils/formatters";
import { declOfNum } from "../../../utils/declOfNum";
import type { PresetWorkout } from "../../../types";

export const WorkoutDashboard = ({ workout }: { workout: PresetWorkout }) => {
  const totalSeconds = workout.exercises.reduce((acc, ex) => acc + ex.duration, 0) + 
                       (workout.restDuration * (workout.exercises.length - 1));
  const totalWorkoutTime = totalSeconds * workout.rounds;

  const stats = [
    { icon: ListChecks, color: 'text-brand-blue', value: workout.exercises.length, label: 'УПР', title: 'Количество упражнений' },
    { icon: RefreshCw, color: 'text-brand-emerald', value: workout.rounds, label: declOfNum(workout.rounds, ['КРУГ', 'КРУГА', 'КРУГОВ']), title: 'Количество повторений' },
    { icon: Timer, color: 'text-brand-blue', value: formatDuration(totalWorkoutTime), label: 'ВРЕМЯ', title: 'Общее время выполнения тренировки' },
    { icon: Coffee, color: 'text-brand-rose', value: workout.restDuration, label: 'СЕК', title: 'Время отдыха между упражнениями' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 bg-surface-accent/50 p-4 rounded-[1.8rem] border border-text-primary/5">
      {stats.map((stat, i) => (
        <div key={i} className="flex items-center gap-2.5" title={stat.title}>
          <stat.icon 
            size={15} 
            className={`${stat.color} opacity-90 dark:drop-shadow-[0_0_3px_currentColor]`} 
          />
          
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-black italic text-text-primary uppercase tracking-tighter leading-none">
              {stat.value}
            </span>
            {stat.label && (
              <span className="text-[7px] font-black text-text-muted uppercase tracking-widest leading-none italic">
                {stat.label}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
