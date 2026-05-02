import React from 'react';
import { History, Play } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';

export const EmptyHistory: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <div className="relative mb-10">
        <div className="absolute inset-0 bg-brand-blue blur-3xl opacity-10 rounded-full" />
        <Card className="size-24 flex items-center justify-center text-text-muted border-none shadow-2xl">
          <History size={40} strokeWidth={1.5} />
        </Card>
      </div>

      <div className="mb-10">
        <h3 className="text-3xl font-black uppercase italic tracking-tighter text-text-primary mb-3">
          История пуста
        </h3>
        <p className="text-sm text-text-muted leading-relaxed max-w-[260px]">
          Ты еще не завершил ни одной сессии. Пора войти в историю <span className="text-brand-blue font-black italic">Maniac Mode</span>!
        </p>
      </div>

      <NavLink to="/" className="w-full max-w-[240px]">
        <Button 
          variant="primary"
          fullWidth
          className="gap-3 py-5"
        >
          <Play size={20} fill="currentColor" />
          <span className="uppercase font-black italic tracking-widest">В зал</span>
        </Button>
      </NavLink>
    </div>
  );
};
