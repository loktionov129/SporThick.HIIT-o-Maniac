export const playBeep = (frequency = 440, duration = 200, volume = 0.1) => {
  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = 'sine'; 

  gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration / 1000);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + duration / 1000);
};
