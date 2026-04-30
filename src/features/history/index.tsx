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
    <div className="space-y-6 pb-32 overflow-x-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex items-center justify-between px-2 pt-2">
        <h2 className="text-2xl font-black uppercase tracking-tight text-text-primary italic">
          История
        </h2>
        
        <button 
          onClick={handleClearAll}
          className="cursor-pointer text-text-muted hover:text-brand-rose text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-90 px-2 py-1"
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
      
      <p className="text-center text-[9px] text-text-muted uppercase font-black tracking-[0.4em] opacity-40 pt-4">
        Всего сессий: {history.length}
      </p>
    </div>
  );
};
