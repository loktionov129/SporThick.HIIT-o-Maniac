import type { SoundPreset } from '@app-types/index';

export const SIGNAL_NAMES: Record<string, { name: string; desc: string }> = {
  START_WORK: { 
    name: 'Работа', 
    desc: 'Сигнал к началу упражнения' 
  },
  END_WORK: { 
    name: 'Отдых', 
    desc: 'Пора перевести дух' 
  },
  END_ROUND: { 
    name: 'Круг завершен', 
    desc: 'Конец текущего раунда' 
  },
  FINISH: { 
    name: 'Победа', 
    desc: 'Финальный аккорд тренировки' 
  },
  COUNTDOWN: { 
    name: 'Отсчет', 
    desc: 'Последние 3-2-1 секунды' 
  },
};

export const SOUND_PRESETS: Record<SoundPreset, { name: string; icon: string }> = {
  maniac: { name: 'Маньяк', icon: '💀' },
  tabata: { name: 'Табата', icon: '🔔' },
  army: { name: 'Армейский', icon: '🎖️' },
  asmr_female: { name: 'АСМР', icon: '🎙️' },
  sexy: { name: 'Секси', icon: '🔥' },
  classic: { name: 'Классика', icon: '📻' },
  cyberpunk: { name: 'Кибер', icon: '🤖' },
  fantasy: { name: 'Фэнтези', icon: '⚔️' },
} as const;

export const PRESETS_ARRAY = Object.entries(SOUND_PRESETS).map(([id, data]) => ({
  id: id as SoundPreset,
  ...data,
}));