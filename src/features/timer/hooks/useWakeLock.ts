import { useEffect, useRef } from 'react';

export const useWakeLock = (enabled: boolean) => {
  const wakeLock = useRef<any>(null);

  const requestLock = async () => {
    try {
      if ('wakeLock' in navigator) {
        wakeLock.current = await navigator.wakeLock.request('screen');
        console.log('Wake Lock active 📱');
      }
    } catch (err) {
      console.error('Wake Lock error:', err);
    }
  };

  const releaseLock = async () => {
    if (wakeLock.current) {
      await wakeLock.current.release();
      wakeLock.current = null;
      console.log('Wake Lock released');
    }
  };

  useEffect(() => {
    if (enabled) {
      requestLock();
    } else {
      releaseLock();
    }

    const handleVisibilityChange = () => {
      if (wakeLock.current !== null && document.visibilityState === 'visible') {
        requestLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      releaseLock();
    };
  }, [enabled]);
};
