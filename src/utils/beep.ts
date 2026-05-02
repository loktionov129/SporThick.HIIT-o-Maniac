import { SIGNAL_NAMES } from '@/constants/sounds';
import type { SoundPreset } from '@app-types/index';
import { useWorkoutStore } from '@store/useWorkoutStore';

const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
const audioBuffers: Record<string, AudioBuffer> = {};
let activeSource: AudioBufferSourceNode | null = null;

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

const getSoundPaths = (id: string) => 
  Object.keys(SIGNAL_NAMES).reduce((acc, signal) => ({
    ...acc,
    [signal]: `/sounds/${id}/${signal}.wav`
  }), {} as Record<SignalType, string>);

export const initManiacSounds = async (preset: SoundPreset) => {
  const urls = getSoundPaths(preset);
  Object.keys(audioBuffers).forEach(key => delete audioBuffers[key]);

  for (const [key, url] of Object.entries(urls)) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('File not found');
      const arrayBuffer = await response.arrayBuffer();
      audioBuffers[key] = await audioCtx.decodeAudioData(arrayBuffer);
    } catch (e) {
      console.warn(`Fallback active for: ${key}`, e);
    }
  }
};

export const playSignal = (type: SignalType) => {
  const { soundEnabled } = useWorkoutStore.getState().settings;
  if (!soundEnabled) return;

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  if (activeSource) {
    try {
      activeSource.stop();
    } catch (e) {
    }
    activeSource = null;
  }

  if (audioBuffers[type]) {
    const source = audioCtx.createBufferSource();
    const gainNode = audioCtx.createGain();
    
    source.buffer = audioBuffers[type];
    gainNode.gain.value = type === 'COUNTDOWN' ? 0.4 : 1.0;
    
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    source.start(0);
    activeSource = source;

    source.onended = () => {
      if (activeSource === source) activeSource = null;
    };
  } else {
    playFallback(type);
  }
};
