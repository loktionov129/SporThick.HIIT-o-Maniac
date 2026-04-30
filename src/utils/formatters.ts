export const formatDate = (ms: number) => 
  new Date(ms).toLocaleDateString('ru-RU', { 
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' 
  });

export const formatDuration = (totalSeconds: number) => {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const parts = [m, s].map(v => v.toString().padStart(2, '0'));
  if (h > 0) parts.unshift(h.toString().padStart(2, '0'));
  return parts.join(':');
};
