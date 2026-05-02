import { useWorkoutStore } from '@store/useWorkoutStore';
import type { SoundPreset } from '@app-types/index';
import { playSignal } from '@utils/beep';

const PRESETS: { id: SoundPreset; name: string; icon: string }[] = [
  { id: 'maniac', name: 'Маньяк', icon: '💀' },
  { id: 'army', name: 'Армейский', icon: '🎖️' },
  { id: 'sexy', name: 'Сексуальный', icon: '🔥' },
  { id: 'tabata', name: 'Табата', icon: '🔔' },
  { id: 'classic', name: 'Классика', icon: '📻' },
];

export const SoundSettings = () => {
  const { settings, actions } = useWorkoutStore();

  const handlePresetChange = (presetId: SoundPreset) => {
    actions.setSoundPreset(presetId);
    setTimeout(() => playSignal('START_WORK'), 100);
  };

  return (
    <div className="space-y-4 p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black uppercase tracking-tighter text-white">
          Озвучка
        </h3>
        <button
          onClick={() => actions.toggleSound()}
          className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${
            settings.soundEnabled 
              ? 'bg-green-500 text-black' 
              : 'bg-zinc-700 text-zinc-400'
          }`}
        >
          {settings.soundEnabled ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handlePresetChange(preset.id)}
            disabled={!settings.soundEnabled}
            className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
              settings.soundPreset === preset.id
                ? 'border-red-600 bg-red-600/10 text-white'
                : 'border-zinc-800 bg-zinc-800/50 text-zinc-500 hover:border-zinc-700'
            } ${!settings.soundEnabled && 'opacity-50 cursor-not-allowed'}`}
          >
            <span className="text-2xl">{preset.icon}</span>
            <span className="font-bold text-sm leading-none">{preset.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};