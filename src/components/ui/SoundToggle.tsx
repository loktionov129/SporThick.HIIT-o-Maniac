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
      className=""
      title={soundEnabled ? "Выключить звук" : "Включить звук"}
    >
      {soundEnabled ? (
        <div className="">
           <div className="" />
           <Volume2 size={22} className="" />
        </div>
      ) : (
        <VolumeX size={22} />
      )}
    </button>
  );
};
