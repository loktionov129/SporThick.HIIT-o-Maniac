import { AnimatePresence } from 'framer-motion';
import { useModalStore } from '@store/useModalStore';
import { useToastStore } from '@store/useToastStore';
import { useWorkoutStore, useWorkoutActions } from '@store/useWorkoutStore';
import { Button } from '@ui/Button';
import { EmptyHistory } from './components/EmptyHistory';
import { HistoryItem } from './components/HistoryItem';

export const HistoryScreen = () => {
  const history = useWorkoutStore((s) => s.history);
  const { clearHistory, deleteHistoryEntry } = useWorkoutActions();
  const showToast = useToastStore((s) => s.showToast);
  const openModal = useModalStore(s => s.openModal);

  if (history.length === 0) {
    return <EmptyHistory />;
  }

  const handleClearEntry = (id: string) => {
    openModal({
      title: "Удалить?",
      message: "Эта запись исчезнет навсегда. Ты уверен?",
      confirmText: "Удалить",
      variant: "danger",
      onConfirm: () => {
        deleteHistoryEntry(id);
        showToast('Запись удалена', 'info');
      },
    });
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
    <div className="flex flex-col gap-6">
      <header className="flex justify-between items-end px-2">
        <div className="space-y-1">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-text-primary leading-none">
            История
          </h2>
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.25em]">
            Сессий: {history.length}
          </p>
        </div>
        
        <Button 
          variant="ghost" 
          onClick={handleClearAll}
          className="text-brand-rose text-[10px] uppercase font-black tracking-widest px-4 py-2"
        >
          Очистить
        </Button>
      </header>

      <div className="flex flex-col gap-3">
        <AnimatePresence mode="popLayout">
          {history.map((entry) => (
            <HistoryItem 
              key={entry.id} 
              entry={entry} 
              onDelete={() => handleClearEntry(entry.id)} 
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
