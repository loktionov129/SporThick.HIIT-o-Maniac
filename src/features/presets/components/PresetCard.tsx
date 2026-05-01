import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Zap, Activity } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { useWorkoutActions } from '../../../store/useWorkoutStore';
import { useToastStore } from '../../../store/useToastStore';
import type { PresetWorkout } from '../../../constants/presets';

interface PresetCardProps {
  preset: PresetWorkout;
}

const intensityStyles = {
  light: {
    accent: 'text-brand-emerald',
    bg: 'bg-brand-emerald/10',
    border: 'border-brand-emerald/10 hover:border-brand-emerald/30',
    glow: 'shadow-brand-emerald/10'
  },
  standard: {
    accent: 'text-brand-blue',
    bg: 'bg-brand-blue/10',
    border: 'border-brand-blue/10 hover:border-brand-blue/30',
    glow: 'shadow-brand-blue/10'
  },
  extreme: {
    accent: 'text-brand-rose',
    bg: 'bg-brand-rose/10',
    border: 'border-brand-rose/10 hover:border-brand-rose/30',
    glow: 'shadow-brand-rose/10'
  }
};

export const PresetCard: React.FC<PresetCardProps> = ({ preset }) => {
  const { addWorkout } = useWorkoutActions();
  const showToast = useToastStore((s) => s.showToast);
  const navigate = useNavigate();
  const style = intensityStyles[preset.intensity];

  const handleAdd = () => {
    const id = crypto.randomUUID();
    addWorkout({ ...preset, id });
    showToast(`${preset.name} добавлен!`, 'success');
    navigate(`/create-edit-workout?workoutId=${id}`);
  };

  return (
    <Card 
      onClick={handleAdd}
      className="relative overflow-hidden group border-none bg-linear-to-br from-surface-card to-surface-accent/30 p-5"
    >
      <Zap size={100} className={`absolute -right-4 -top-4 ${style.accent} opacity-5 -rotate-12 pointer-events-none`} />

      {/* Верхний ряд: Иконка + Заголовок + Кнопка */}
      <div className="flex items-start justify-between mb-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`size-10 ${style.bg} ${style.accent} rounded-xl flex items-center justify-center shadow-lg ${style.glow}`}>
            <Zap size={20} fill="currentColor" />
          </div>
          <div className="flex flex-col">
            <h4 className="text-xl font-black uppercase italic tracking-tighter text-text-primary leading-none">
              {preset.name}
            </h4>
            <div className="flex items-center gap-2 mt-1 text-[9px] font-black uppercase tracking-widest text-text-muted">
              <span className={style.accent}>{preset.rounds} РАУНДА</span>
              <span className="opacity-20">•</span>
              <span>{preset.restDuration}С ОТДЫХ</span>
            </div>
          </div>
        </div>
        
        <div className="size-9 bg-brand-blue rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-blue/20 active:scale-90 transition-transform">
          <Plus size={18} strokeWidth={3} />
        </div>
      </div>

      {/* Основной контент (упражнения) */}
      <div className="flex flex-wrap gap-1.5 relative z-10">
        {preset.exercises.slice(0, 3).map((ex) => (
          <div key={ex.id} className="flex items-center gap-1 bg-surface-main/60 px-2.5 py-1 rounded-lg border border-white/5">
            <Activity size={8} className={style.accent} />
            <span className="text-[8px] font-bold uppercase text-text-primary/70 whitespace-nowrap">
              {ex.name}
            </span>
          </div>
        ))}
        {preset.exercises.length > 3 && (
          <div className="bg-surface-main/60 px-2 py-1 rounded-lg border border-white/5">
            <span className="text-[8px] font-black text-text-muted">+{preset.exercises.length - 3}</span>
          </div>
        )}
      </div>
    </Card>
  );
};
