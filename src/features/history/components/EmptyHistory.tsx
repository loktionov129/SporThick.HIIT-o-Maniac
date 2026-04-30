import React from 'react';
import { History, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';

export const EmptyHistory: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 bg-surface-accent/30 dark:bg-surface-accent/20 border border-text-muted/10 rounded-[40px] backdrop-blur-md relative overflow-hidden transition-colors duration-500">
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-blue/5 dark:bg-brand-blue/10 blur-[80px] rounded-full" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-brand-blue/5 dark:bg-brand-blue/10 blur-[80px] rounded-full" />

      <div className="relative mb-8">
        <div className="absolute inset-0 bg-brand-blue/20 dark:bg-brand-blue/30 blur-2xl rounded-full scale-150" />
        <div className="relative bg-surface-card border border-text-muted/10 p-6 rounded-[32px] shadow-2xl dark:shadow-brand-blue/5">
          <History className="h-12 w-12 text-brand-blue" />
        </div>
      </div>

      <div className="relative z-10 text-center space-y-3 mb-10">
        <h3 className="text-2xl font-black text-text-primary uppercase tracking-tighter italic">
          История пуста
        </h3>
        <p className="text-text-muted text-sm max-w-[240px] leading-relaxed font-medium">
          Ты еще не завершил ни одной сессии. Пора войти в историю <span className="text-brand-blue font-bold">Maniac Mode</span>!
        </p>
      </div>

      <Button 
        onClick={() => navigate('/')}
        variant="primary"
        className="relative z-10 py-5 px-10 shadow-xl shadow-brand-blue/20 active:scale-95"
      >
        <Play size={20} className="fill-current" />
        В зал
      </Button>
    </div>
  );
};
