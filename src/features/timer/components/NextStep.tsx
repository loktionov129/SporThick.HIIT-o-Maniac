import type { Workout } from '@app-types/index';

interface Props {
  workout: Workout;
  isResting: boolean;
  currentExerciseIndex: number;
  currentRound: number;
}

export const NextStep = ({ workout, isResting, currentExerciseIndex, currentRound }: Props) => (
  <div className="flex flex-col items-center min-h-[40px] justify-center">
    <span className="text-[8px] font-black uppercase tracking-[0.4em] mb-1 italic">
      Далее
    </span>
    
    <span className="text-xs font-black uppercase italic tracking-wider truncate max-w-[240px]">
      {(() => {
        // 1. Если сейчас работа, то дальше будет отдых (если он настроен)
        if (!isResting && (workout.restDuration || 0) > 0) {
          return "Отдых";
        }

        // 2. Если сейчас отдых или отдых не предусмотрен, ищем следующее упражнение в этом круге
        if (currentExerciseIndex < workout.exercises.length - 1) {
          return workout.exercises[currentExerciseIndex + 1].name;
        }

        // 3. Если упражнения кончились, но есть следующий круг
        if (currentRound < workout.rounds) {
          return `Круг ${currentRound + 1}`;
        }

        // 4. Если это совсем конец
        return "Финиш";
      })()}
    </span>
  </div>
);