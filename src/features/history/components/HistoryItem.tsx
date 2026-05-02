import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Calendar, Trash2, X, RotateCcw } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { formatDate, formatDuration } from '../../../utils/formatters';
import type { WorkoutHistoryEntry } from '../../../types';
import { Stat } from './Stat';
import { Button } from '../../../components/ui/Button';

interface Props {
  entry: WorkoutHistoryEntry;
  onDelete: () => void;
}

export const HistoryItem = ({ entry, onDelete }: Props) => {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-surface-main">
      
      <div className="absolute inset-0 flex items-center justify-end pr-2 pointer-events-none">
        <div className="h-[85%] w-[90%] bg-brand-rose rounded-[2rem] flex items-center justify-end px-10 text-white">
          <div className="flex flex-col items-center gap-1">
            <Trash2 size={24} />
            <span className="text-[9px] font-black uppercase tracking-widest">Удалить</span>
          </div>
        </div>
      </div>

      <motion.div
        layout
        drag="x"
        dragConstraints={{ left: -100, right: 0 }}
        dragSnapToOrigin
        dragElastic={0.1}
        onDragEnd={(_, info) => {
          if (info.offset.x < -70) {
            onDelete();
          }
        }}
        className="relative z-10 will-change-transform"
      >
        <Card className="flex flex-col gap-6 border-none !bg-surface-card shadow-sm">
          <div className="flex justify-between items-start">
             <div className="space-y-2">
                <h4 className="text-xl font-black uppercase italic leading-none text-text-primary tracking-tight">
                  {entry.workoutName}
                </h4>
                <div className="flex items-center gap-2 text-text-muted">
                  <Calendar size={12} strokeWidth={3} />
                  <p className="text-[10px] font-bold uppercase tracking-widest leading-none">
                    {formatDate(entry.timestamp)}
                  </p>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                onClick={(e) => {
                  e.preventDefault();
                  onDelete();
                }}
                className="p-2 -mr-3 text-text-muted/30 hover:text-brand-rose"
              >
                <X size={18} strokeWidth={3} />
              </Button>
          </div>

          <div className="flex items-end justify-between">
            <div className="flex gap-8">
              <Stat label="Время" value={formatDuration(entry.totalTime)} color="text-brand-blue" />
              <Stat label="Круги" value={entry.totalRounds} color="text-brand-emerald" />
            </div>

            <NavLink to={`/timer?workoutId=${entry.workoutId}`} className="shrink-0">
              <Button 
                variant="secondary" 
                className="!size-14 !p-0 rounded-2xl flex items-center justify-center bg-surface-accent border border-white/5 shadow-lg active:scale-90 transition-all group/btn"
              >
                <RotateCcw size={24} strokeWidth={3} className="text-brand-blue transition-transform duration-300 group-hover/btn:-rotate-45" />
              </Button>
            </NavLink>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
