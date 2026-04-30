import { AnimatePresence } from 'framer-motion';
import { useWorkoutStore, useWorkoutActions } from '../../store/useWorkoutStore';
import { EmptyHistory } from './components/EmptyHistory';
import { HistoryItem } from './components/HistoryItem';

export const HistoryScreen = () => {
  const history = useWorkoutStore((s) => s.history);
  const { clearHistory, deleteHistoryEntry } = useWorkoutActions();

  if (history.length === 0) {
    return <EmptyHistory />;
  }

  const handleClearAll = () => {
    if (window.confirm('Очистить всю историю тренировок?')) {
      clearHistory();
    }
  };

  return (
    <div className="space-y-6 pb-32 overflow-x-hidden">
      <header className="flex items-center justify-between px-1">
        <h2 className="text-xl font-black uppercase tracking-tight text-white italic">История</h2>
        <button 
          onClick={handleClearAll}
          className="text-slate-600 hover:text-red-500 text-[10px] font-black uppercase tracking-[0.2em] transition-colors"
        >
          Очистить
        </button>
      </header>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {history.map((entry) => (
            <HistoryItem 
              key={entry.id} 
              entry={entry} 
              onDelete={deleteHistoryEntry} 
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
