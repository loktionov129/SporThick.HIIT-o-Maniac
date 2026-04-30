import React from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

interface PageContainerProps {
  children: React.ReactNode;
  withHeader?: boolean;
  withBottomNav?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({ 
  children, 
  withHeader = false,
  withBottomNav = false,
  maxWidth = 'md',
  className = ""
}) => {
  
  const maxWeights = {
    sm: 'max-w-[400px]',
    md: 'max-w-[600px]',
    lg: 'max-w-[900px]'
  };

  return (
    <div className={`min-h-screen bg-surface-main text-text-primary antialiased transition-colors duration-300 ${withBottomNav ? 'pb-32' : 'pb-8'}`}>
      <div className={`${maxWeights[maxWidth]} mx-auto px-4 sm:px-6 flex flex-col gap-6`}>
        
        {withHeader && (
          <header className="pt-4">
            <Header />
          </header>
        )}

        <main className={`w-full ${className}`}>
          {children}
        </main>

      </div>

      {withBottomNav && <BottomNav />}
    </div>
  );
};
