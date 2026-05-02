import { SOUND_PRESETS } from "../constants/sounds";
import { useWorkoutStore } from "../store/useWorkoutStore";

const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
const audioBuffers: Record<string, AudioBuffer> = {};
export type SignalType = 'START_WORK' | 'END_WORK' | 'END_ROUND' | 'FINISH' | 'COUNTDOWN';

const playFallback = (type: SignalType) => {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const now = audioCtx.currentTime;

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  switch (type) {
    case 'START_WORK':
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.1, now);
      osc.start();
      osc.stop(now + 0.15);
      break;
    case 'COUNTDOWN':
      osc.frequency.setValueAtTime(440, now);
      gain.gain.setValueAtTime(0.05, now);
      osc.start();
      osc.stop(now + 0.05);
      break;
    default:
      osc.frequency.setValueAtTime(440, now);
      gain.gain.setValueAtTime(0.1, now);
      osc.start();
      osc.stop(now + 0.3);
  }
};

export const initManiacSounds = async () => {
  // Берем пресет из стора (по умолчанию 'maniac')
  const currentPreset = useWorkoutStore.getState().settings.soundPreset || 'maniac';
  const urls = SOUND_PRESETS[currentPreset];

  for (const [key, url] of Object.entries(urls)) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('File not found');
      const arrayBuffer = await response.arrayBuffer();
      audioBuffers[key] = await audioCtx.decodeAudioData(arrayBuffer);
    } catch (e) {
      console.warn(`Fallback active for: ${key} (reason: ${e})`);
    }
  }
};

export const playSignal = (type: SignalType) => {
  const { soundEnabled } = useWorkoutStore.getState().settings;
  
  if (!soundEnabled) return;

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  if (audioBuffers[type]) {
    const source = audioCtx.createBufferSource();
    const gainNode = audioCtx.createGain();
    
    source.buffer = audioBuffers[type];
    
    if (type === 'COUNTDOWN') gainNode.gain.value = 0.4;
    
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    source.start(0);
  } else {
    playFallback(type);
  }
};
