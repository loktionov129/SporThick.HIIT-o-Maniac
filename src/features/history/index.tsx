import React from 'react';
import { Calendar } from 'lucide-react';
import useWorkoutStore from '../../store/useWorkoutStore';
import { Card } from '../../components/ui/Card';

export const HistoryScreen = () => {
  const { history, clearHistory } = useWorkoutStore();

  const formatDate = (ms: number) => {
    return new Date(ms).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black uppercase tracking-tight text-white">История</h2>
        {history.length > 0 && (
          <button onClick={clearHistory} className="text-slate-500 hover:text-red-500 text-xs font-bold uppercase tracking-widest">
            Очистить
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/20 rounded-3xl border border-dashed border-slate-800">
           <Calendar className="mx-auto text-slate-700 mb-4" size={40} />
           <p className="text-slate-500">Ты еще не завершил ни одной тренировки</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((entry) => (
            <Card key={entry.id} className="flex items-center justify-between border-slate-800/40">
              <div>
                <h4 className="text-white font-bold">{entry.workoutName}</h4>
                <p className="text-[10px] text-slate-500 uppercase font-black mt-1">
                  {formatDate(entry.timestamp)}
                </p>
              </div>
              <div className="flex gap-4 text-right">
                <div className="flex flex-col">
                  <span className="text-blue-500 font-black tabular-nums text-sm">
                    {Math.floor(entry.totalTime / 60)}м
                  </span>
                  <span className="text-[8px] text-slate-600 uppercase font-bold">Время</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-emerald-500 font-black tabular-nums text-sm">
                    {entry.totalRounds}
                  </span>
                  <span className="text-[8px] text-slate-600 uppercase font-bold">Круги</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
