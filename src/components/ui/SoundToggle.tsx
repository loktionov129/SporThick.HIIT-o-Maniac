import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useWorkoutActions, useWorkoutStore } from '../../store/useWorkoutStore';
import { useToastStore } from '../../store/useToastStore';

interface SoundToggleProps {
  className?: string;
}

export const SoundToggle: React.FC<SoundToggleProps> = ({ className = "" }) => {
  const { toggleSound } = useWorkoutActions();
  const soundEnabled = useWorkoutStore((s) => s.settings.soundEnabled);
  const showToast = useToastStore((s) => s.showToast);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSound();
    showToast(soundEnabled ? 'Звук выключен' : 'Звук включен', 'info');
  };

  return (
    <button 
      onClick={handleToggle}
      className={`
        cursor-pointer relative flex items-center justify-center p-3 rounded-2xl transition-all duration-300 active:scale-90 border
        ${soundEnabled 
          ? 'bg-brand-blue/10 border-brand-blue/20 text-brand-blue shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
          : 'bg-surface-accent border-surface-card text-text-muted'}
        ${className}
      `}
      title={soundEnabled ? "Выключить звук" : "Включить звук"}
    >
      {soundEnabled ? (
        <div className="relative">
           <div className="absolute inset-0 blur-md bg-brand-blue/50 opacity-0 dark:opacity-100" />
           <Volume2 size={22} className="relative z-10" />
        </div>
      ) : (
        <VolumeX size={22} />
      )}
    </button>
  );
};
