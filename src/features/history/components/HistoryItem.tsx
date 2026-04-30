import { motion } from 'framer-motion';
import { Calendar, Trash2, X } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { formatDate, formatDuration } from '../../../utils/formatters';
import type { WorkoutHistoryEntry } from '../../../types';
import { useModalStore } from '../../../store/useModalStore';
import { Stat } from './Stat';
import { useToastStore } from '../../../store/useToastStore';

interface Props {
  entry: WorkoutHistoryEntry;
  onDelete: (id: string) => void;
}

export const HistoryItem = ({ entry, onDelete }: Props) => {
  const openModal = useModalStore(s => s.openModal);
  const showToast = useToastStore((s) => s.showToast);
  const handleDelete = () => {
    openModal({
      title: "Удалить?",
      message: "Эта запись исчезнет навсегда. Ты уверен?",
      confirmText: "Удалить",
      variant: "danger",
      onConfirm: () => {
        onDelete(entry.id);
        showToast('Запись удалена', 'info');
      },
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: -100, filter: 'blur(10px)' }}
      className="relative mb-2 group p-2 -m-2"
    >
      <div className="absolute inset-2 bg-brand-rose rounded-[24px] overflow-hidden">
        <div className="absolute inset-y-0 right-0 flex items-center pr-8 text-white">
          <div className="flex flex-col items-center gap-1 opacity-80">
            <Trash2 size={20} className="animate-pulse" />
            <span className="text-[8px] font-black uppercase tracking-widest">Удалить</span>
          </div>
        </div>
      </div>

      <motion.div
        drag="x"
        dragConstraints={{ left: -100, right: 0 }}
        dragElastic={0.1}
        onDragEnd={(_, info) => info.offset.x < -80 && onDelete(entry.id)}
        className="relative z-10 touch-pan-y"
      >
        <button 
          onClick={handleDelete} 
          className="cursor-pointer absolute -top-1 right-0 z-30 w-7 h-7 bg-surface-accent border-2 border-surface-main text-brand-rose rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all hover:bg-brand-rose hover:text-white"
        >
          <X size={14} strokeWidth={3} />
        </button>

        <Card className="flex items-center justify-between pr-10 min-h-[90px] border-text-muted/5">
          <div className="flex-1 min-w-0 pr-4 text-left">
            <h4 className="text-text-primary font-black truncate text-lg tracking-tight italic">
              {entry.workoutName}
            </h4>
            <div className="flex items-center gap-2 mt-1.5">
              <Calendar size={12} className="text-brand-blue/50 shrink-0" />
              <p className="text-[10px] text-text-muted uppercase font-black tracking-widest opacity-70">
                {formatDate(entry.timestamp)}
              </p>
            </div>
          </div>

          <div className="flex gap-6 text-right shrink-0">
            <Stat label="Время" value={formatDuration(entry.totalTime)} color="text-brand-blue" />
            <Stat label="Круги" value={entry.totalRounds} color="text-brand-emerald" />
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};
