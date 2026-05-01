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
      className=""
    >
      <div className="">
        <div className="">
          <div className="">
            <Trash2 size={20} className="" />
            <span className="">Удалить</span>
          </div>
        </div>
      </div>

      <motion.div
        drag="x"
        dragConstraints={{ left: -100, right: 0 }}
        dragElastic={0.1}
        onDragEnd={(_, info) => info.offset.x < -80 && onDelete(entry.id)}
        className=""
      >
        <button 
          onClick={handleDelete} 
          className=""
        >
          <X size={14} strokeWidth={3} />
        </button>

        <Card className="">
          <div className="">
            <h4 className="">
              {entry.workoutName}
            </h4>
            <div className="">
              <Calendar size={12} className="" />
              <p className="">
                {formatDate(entry.timestamp)}
              </p>
            </div>
          </div>

          <div className="">
            <Stat label="Время" value={formatDuration(entry.totalTime)} color="text-brand-blue" />
            <Stat label="Круги" value={entry.totalRounds} color="text-brand-emerald" />
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};
