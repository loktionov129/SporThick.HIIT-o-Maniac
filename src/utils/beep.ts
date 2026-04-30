const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

export const playSignal = (type: 'START_WORK' | 'END_WORK' | 'END_ROUND' | 'FINISH' | 'COUNTDOWN') => {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  const now = audioCtx.currentTime;

  switch (type) {
    case 'START_WORK': // Высокий короткий
      oscillator.frequency.setValueAtTime(880, now);
      oscillator.start();
      oscillator.stop(now + 0.1);
      break;
    case 'END_WORK': // Средний
      oscillator.frequency.setValueAtTime(440, now);
      oscillator.start();
      oscillator.stop(now + 0.3);
      break;
    case 'END_ROUND': // Низкий длинный
      oscillator.frequency.setValueAtTime(220, now);
      oscillator.start();
      oscillator.stop(now + 0.6);
      break;
    case 'FINISH': // Двойной
      oscillator.frequency.setValueAtTime(660, now);
      oscillator.start();
      oscillator.frequency.exponentialRampToValueAtTime(880, now + 0.4);
      oscillator.stop(now + 0.4);
      break;
    case 'COUNTDOWN': // Тихий щелчок
      oscillator.frequency.setValueAtTime(440, now);
      gainNode.gain.setValueAtTime(0.05, now);
      oscillator.start();
      oscillator.stop(now + 0.05);
      break;
  }
};
