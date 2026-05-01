import { AnimatePresence } from 'framer-motion';
import { useWorkoutStore, useWorkoutActions } from '../../store/useWorkoutStore';
import { EmptyHistory } from './components/EmptyHistory';
import { HistoryItem } from './components/HistoryItem';
import { useToastStore } from '../../store/useToastStore';
import { useModalStore } from '../../store/useModalStore';

export const HistoryScreen = () => {
  const history = useWorkoutStore((s) => s.history);
  const { clearHistory, deleteHistoryEntry } = useWorkoutActions();
  const showToast = useToastStore((s) => s.showToast);
  const openModal = useModalStore(s => s.openModal);

  if (history.length === 0) {
    return <EmptyHistory />;
  }

  const handleClearEntry = (id: string) => {
    deleteHistoryEntry(id);
    showToast('Запись удалена', 'info');
  }

  const handleClearAll = () => {
    openModal({
      title: "Очистить?",
      message: "История тренировок исчезнет навсегда. Ты уверен?",
      confirmText: "Очистить",
      variant: "danger",
      onConfirm: () => {
        clearHistory();
        showToast('История очищена', 'error');
      },
    });
  };

  return (
    <div className="">
      <header className="">
        <h2 className="">
          История
        </h2>
        
        <button 
          onClick={handleClearAll}
          className=""
        >
          Очистить
        </button>
      </header>

      <div className="">
        <AnimatePresence mode="popLayout">
          {history.map((entry) => (
            <HistoryItem 
              key={entry.id} 
              entry={entry} 
              onDelete={handleClearEntry} 
            />
          ))}
        </AnimatePresence>
      </div>
      
      <p className="">
        Всего сессий: {history.length}
      </p>
    </div>
  );
};
