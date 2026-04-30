import { motion } from 'framer-motion';
import { Calendar, Trash2, X } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { formatDate, formatDuration } from '../../../utils/formatters';
import type { WorkoutHistoryEntry } from '../../../types';
import { Stat } from './Stat';

interface Props {
  entry: WorkoutHistoryEntry;
  onDelete: (id: string) => void;
}

export const HistoryItem = ({ entry, onDelete }: Props) => {
  const handleDelete = () => {
    if (window.confirm('Удалить эту запись?')) onDelete(entry.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: -100, filter: 'blur(10px)' }}
      className="relative mb-2 group p-2 -m-2"
    >
      <div className="absolute inset-2 bg-red-600 rounded-3xl overflow-hidden">
        <div className="absolute inset-y-0 right-0 flex items-center pr-8 text-white">
          <div className="flex flex-col items-center gap-1">
            <Trash2 size={20} className="animate-pulse" />
            <span className="text-[8px] font-black uppercase tracking-tighter">Удалить</span>
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
        <button onClick={handleDelete} className="cursor-pointer absolute -top-1 right-0 z-30 w-7 h-7 bg-[#1e293b] border-2 border-[#0f172a] text-red-500 rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-transform">
          <X size={14} strokeWidth={3} />
        </button>

        <Card className="flex items-center justify-between !bg-[#0b1224] border-slate-800/60 hover:border-slate-700 transition-all pr-10 min-h-[90px]">
          <div className="flex-1 min-w-0 pr-4 text-left">
            <h4 className="text-white font-black truncate text-lg tracking-tight">{entry.workoutName}</h4>
            <div className="flex items-center gap-2 mt-1.5">
              <Calendar size={12} className="text-blue-500/50 shrink-0" />
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-wider">{formatDate(entry.timestamp)}</p>
            </div>
          </div>

          <div className="flex gap-6 text-right shrink-0">
            <Stat label="Время" value={formatDuration(entry.totalTime)} color="text-blue-500" />
            <Stat label="Круги" value={entry.totalRounds} color="text-emerald-500" />
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

