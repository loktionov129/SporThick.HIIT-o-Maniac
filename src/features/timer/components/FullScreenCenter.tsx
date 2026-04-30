import React from 'react';

export const FullScreenCenter = ({ children }: { children: React.ReactNode }) => (
  <div className="h-[70vh] flex flex-col items-center justify-center animate-in fade-in duration-500">
    {children}
  </div>
);
