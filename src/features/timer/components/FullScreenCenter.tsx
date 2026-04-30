import React from 'react';

export const FullScreenCenter = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-[75svh] w-full flex flex-col items-center justify-center px-4 py-12 animate-in fade-in zoom-in-95 duration-500">
    <div className="w-full max-w-sm flex flex-col items-center">
      {children}
    </div>
  </div>
);
