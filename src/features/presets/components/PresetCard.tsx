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
    addWorkout({
      ...preset,
      id,
    });
    showToast(`${preset.name} добавлен!`);
    navigate(`/create-edit-workout?workoutId=${id}`);
  };

  return (
    <Card 
      onClick={handleAdd}
      className={`group relative flex flex-col h-full border transition-all duration-300 active:scale-[0.98] ${style.border} ${style.glow}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl transition-transform group-hover:scale-110 duration-300 ${style.bg} ${style.accent}`}>
          <Zap size={20} fill="currentColor" className="opacity-80" />
        </div>
        
        <div className="bg-surface-accent p-2 rounded-xl text-text-muted group-hover:bg-brand-blue group-hover:text-white transition-all duration-500 shadow-sm">
          <Plus size={18} strokeWidth={3} />
        </div>
      </div>

      <div className="space-y-1 mb-4">
        <h4 className="text-lg font-black text-text-primary uppercase italic tracking-tight leading-tight">
          {preset.name}
        </h4>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-black uppercase tracking-widest ${style.accent}`}>
            {preset.rounds} раунд.
          </span>
          <span className="w-1 h-1 bg-text-muted/20 rounded-full" />
          <span className="text-[10px] text-text-muted font-bold uppercase opacity-70">
            {preset.restDuration}с отдых
          </span>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-text-muted/5">
        <div className="flex flex-wrap gap-1.5">
          {preset.exercises.slice(0, 3).map((ex) => (
            <div 
              key={ex.id} 
              className="flex items-center gap-1 bg-surface-accent px-2 py-1 rounded-md"
            >
              <Activity size={10} className="text-text-muted" />
              <span className="text-[9px] font-bold text-text-muted uppercase truncate max-w-[80px]">
                {ex.name}
              </span>
            </div>
          ))}
          {preset.exercises.length > 3 && (
            <span className="text-[9px] font-black text-text-muted/40 self-center ml-1">
              +{preset.exercises.length - 3}
            </span>
          )}
        </div>
      </div>

      <div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity pointer-events-none rounded-[24px] ${style.accent.replace('text', 'bg')}`} />
    </Card>
  );
};
