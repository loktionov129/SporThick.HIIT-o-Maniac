import { Calendar, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useWorkoutStore from '../../store/useWorkoutStore';
import { Card } from '../../components/ui/Card';

export const HistoryScreen = () => {
  const { history, clearHistory, deleteHistoryEntry } = useWorkoutStore();

  const formatDate = (ms: number) => {
    return new Date(ms).toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const parts = [minutes.toString().padStart(2, '0'), seconds.toString().padStart(2, '0')];
    if (hours > 0) parts.unshift(hours.toString().padStart(2, '0'));
    return parts.join(':');
  };

  return (
    <div className="space-y-6 pb-32 overflow-x-hidden">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xl font-black uppercase tracking-tight text-white italic">История</h2>
        {history.length > 0 && (
          <button 
            onClick={() => confirm('Удалить всё?') && clearHistory()} 
            className="cursor-pointer text-slate-600 hover:text-red-500 text-[10px] font-black uppercase tracking-widest transition-colors"
          >
            Очистить
          </button>
        )}
      </div>

      <div className="space-y-4">
<AnimatePresence mode="popLayout">
  {history.map((entry) => (
<motion.div
  key={entry.id}
  layout
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, x: -100, filter: 'blur(10px)' }}
  className="relative mb-2 group p-2 -m-2" 
>
  <div className="absolute inset-2 bg-red-600 rounded-3xl overflow-hidden shadow-inner">
    <div className="absolute inset-y-0 right-0 flex items-center justify-end px-8 text-white">
      <div className="flex flex-col items-center gap-1">
        <Trash2 size={20} className="animate-pulse" />
        <span className="text-[8px] font-black uppercase">Удалить</span>
      </div>
    </div>
  </div>

  <motion.div
    drag="x"
    dragConstraints={{ left: -100, right: 0 }}
    dragElastic={0.1}
    onDragEnd={(_, info) => {
      if (info.offset.x < -80) deleteHistoryEntry(entry.id);
    }}
    className="relative z-10 touch-pan-y"
  >
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (confirm('Удалить эту запись?')) deleteHistoryEntry(entry.id);
      }}
      className="absolute -top-1 right-0 z-30 w-7 h-7 bg-[#1e293b] border-2 border-[#0f172a] text-red-500 rounded-full flex items-center justify-center shadow-2xl cursor-pointer active:scale-90 hover:bg-slate-700 transition-all"
    >
      <X size={14} strokeWidth={3} />
    </button>

    {/* САМА ПЛАШКА */}
    <Card className="flex items-center justify-between !bg-[#0b1224] border-slate-800/60 hover:border-slate-700 transition-all !opacity-100 pr-10 min-h-[90px] shadow-xl">
      <div className="flex-1 min-w-0 pr-4 text-left">
        <h4 className="text-white font-black truncate text-lg tracking-tight">
          {entry.workoutName}
        </h4>
        <div className="flex items-center gap-2 mt-1.5">
          <Calendar size={12} className="text-blue-500/50 shrink-0" />
          <p className="text-[10px] text-slate-500 uppercase font-black tracking-wider whitespace-nowrap">
            {formatDate(entry.timestamp)}
          </p>
        </div>
      </div>

      <div className="flex gap-6 text-right shrink-0">
        <div className="flex flex-col items-end">
          <span className="text-blue-500 font-black tabular-nums text-lg leading-none">
            {formatDuration(entry.totalTime)}
          </span>
          <span className="text-[8px] text-slate-600 uppercase font-black tracking-widest mt-1.5">Время</span>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-emerald-500 font-black tabular-nums text-lg leading-none">
            {entry.totalRounds}
          </span>
          <span className="text-[8px] text-slate-600 uppercase font-black tracking-widest mt-1.5">Круги</span>
        </div>
      </div>
    </Card>
  </motion.div>
</motion.div>

  ))}
</AnimatePresence>

      </div>
    </div>
  );
};
