import React from 'react';
import { Calendar } from 'lucide-react';
import useWorkoutStore from '../../store/useWorkoutStore';
import { Card } from '../../components/ui/Card';

export const HistoryScreen = () => {
  const { history, clearHistory } = useWorkoutStore();

  // Хелпер для форматирования даты
  const formatDate = (ms: number) => {
    return new Date(ms).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
  };

  // НОВЫЙ ХЕЛПЕР: Формат HH:MM:SS
  const formatDuration = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const parts = [
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ];

    // Добавляем часы только если они есть
    if (hours > 0) {
      parts.unshift(hours.toString().padStart(2, '0'));
    }

    return parts.join(':');
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black uppercase tracking-tight text-white">История</h2>
        {history.length > 0 && (
          <button 
            onClick={() => {
              if (confirm('Очистить всю историю?')) clearHistory();
            }} 
            className="cursor-pointer text-slate-500 hover:text-red-500 text-xs font-bold uppercase tracking-widest transition-colors"
          >
            Очистить
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/20 rounded-3xl border border-dashed border-slate-800">
           <Calendar className="mx-auto text-slate-700 mb-4" size={40} />
           <p className="text-slate-500 font-medium">Ты еще не завершил ни одной тренировки</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((entry) => (
            <Card key={entry.id} className="flex items-center justify-between border-slate-800/40 hover:border-slate-700 transition-colors">
              <div className="flex-1 min-w-0 pr-4">
                <h4 className="text-white font-bold truncate text-lg leading-tight">
                  {entry.workoutName}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar size={10} className="text-slate-600" />
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-wider">
                    {formatDate(entry.timestamp)}
                  </p>
                </div>
              </div>

              <div className="flex gap-6 text-right shrink-0">
                {/* Блок Времени */}
                <div className="flex flex-col">
                  <span className="text-blue-500 font-black tabular-nums text-lg tracking-tight">
                    {formatDuration(entry.totalTime)}
                  </span>
                  <span className="text-[9px] text-slate-600 uppercase font-bold tracking-widest">Время</span>
                </div>

                {/* Блок Кругов */}
                <div className="flex flex-col">
                  <span className="text-emerald-500 font-black tabular-nums text-lg tracking-tight">
                    {entry.totalRounds}
                  </span>
                  <span className="text-[9px] text-slate-600 uppercase font-bold tracking-widest">Круги</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
