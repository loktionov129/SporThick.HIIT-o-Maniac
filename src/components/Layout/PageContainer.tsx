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
  className = ""
}) => {
  
  return (
    <div className="">
      <div className="">
        
        {withHeader && (
          <header className="">
            <Header />
          </header>
        )}

        <main className="">
          {children}
        </main>

      </div>

      {withBottomNav && <BottomNav />}
    </div>
  );
};
