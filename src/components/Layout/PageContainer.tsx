import React from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

interface PageContainerProps {
  children: React.ReactNode;
  withHeader?: boolean;
  withBottomNav?: boolean;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({ 
  children, 
  withHeader = false,
  withBottomNav = false,
  className = ''
}) => {
  
  return (
    <div className="flex flex-col h-full w-full max-w-lg mx-auto overflow-hidden bg-surface-main">
      <div className="flex-1 flex flex-col min-h-0">
        
        {withHeader && (
          <header className="shrink-0">
            <Header />
          </header>
        )}

        <main className={`flex-1 overflow-y-auto overflow-x-hidden ${className}`}>
          {children}
        </main>

      </div>

      {withBottomNav && (
        <footer className="shrink-0">
          <BottomNav />
        </footer>
      )}
    </div>
  );
};
