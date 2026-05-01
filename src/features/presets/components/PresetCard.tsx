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
      className=""
    >
      <div className="">
        <div className="">
          <Zap size={20} fill="currentColor" className="" />
        </div>
        
        <div className="">
          <Plus size={18} strokeWidth={3} />
        </div>
      </div>

      <div className="">
        <h4 className="">
          {preset.name}
        </h4>
        <div className="">
          <span className="">
            {preset.rounds} раунд.
          </span>
          <span className="" />
          <span className="">
            {preset.restDuration}с отдых
          </span>
        </div>
      </div>

      <div className="">
        <div className="">
          {preset.exercises.slice(0, 3).map((ex) => (
            <div 
              key={ex.id} 
              className=""
            >
              <Activity size={10} className="" />
              <span className="">
                {ex.name}
              </span>
            </div>
          ))}
          {preset.exercises.length > 3 && (
            <span className="">
              +{preset.exercises.length - 3}
            </span>
          )}
        </div>
      </div>

      <div className="" />
    </Card>
  );
};
