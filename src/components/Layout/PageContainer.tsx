import React from 'react';
import { Header } from '../Header';

interface PageContainerProps {
  children: React.ReactNode;
  withHeader?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg';
}

export const PageContainer: React.FC<PageContainerProps> = ({ 
  children, 
  withHeader = false, 
  maxWidth = 'md' 
}) => {
  
  const maxWeights = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl'
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 antialiased p-4 sm:p-6">
      <div className={`${maxWeights[maxWidth]} mx-auto flex flex-col gap-8`}>
        {withHeader && <Header />}
        <main className="w-full animate-in fade-in duration-500">
          {children}
        </main>
      </div>
    </div>
  );
};
