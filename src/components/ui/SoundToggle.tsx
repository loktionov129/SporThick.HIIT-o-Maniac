import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useWorkoutActions, useWorkoutStore } from '@store/useWorkoutStore';
import { useToastStore } from '@store/useToastStore';
import { Button } from './Button';

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
    <Button 
      variant="ghost"
      onClick={handleToggle}
      className={`p-2 rounded-xl ${
        soundEnabled ? 'text-brand-blue' : 'text-text-muted'
      } ${className}`}
      title={soundEnabled ? "Выключить звук" : "Включить звук"}
    >
      {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
    </Button>
  );
};
