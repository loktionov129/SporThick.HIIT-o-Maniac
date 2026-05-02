import React from 'react';

export const FullScreenCenter = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-[100dvh] w-full flex items-center justify-center bg-surface-main px-6 py-12 overflow-hidden relative">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none" />
    <div className="relative z-10 w-full max-w-sm flex flex-col items-center animate-in fade-in zoom-in duration-700 ease-out">
      {children}
    </div>
  </div>
);
