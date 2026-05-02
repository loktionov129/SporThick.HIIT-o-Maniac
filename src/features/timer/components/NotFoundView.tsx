import { AlertCircle } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { FullScreenCenter } from './FullScreenCenter';
import { NavLink } from 'react-router-dom';

export const NotFoundView = () => (
  <FullScreenCenter>
    <div className="flex flex-col items-center text-center max-w-[280px] animate-in fade-in zoom-in duration-500">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-brand-rose/20 blur-2xl rounded-full animate-pulse" />
        <AlertCircle className="relative text-brand-rose" size={64} strokeWidth={1.5} />
      </div>

      <div className="space-y-4 mb-10">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter text-text-primary leading-tight">
          Упс! Программа <br /> 
          <span className="text-brand-rose">потерялась</span>
        </h2>
        <p className="text-sm font-bold text-text-muted leading-relaxed italic">
          Похоже, эта тренировка ушла на пенсию или была удалена из базы.
        </p>
      </div>

      <NavLink to="/" className="w-full">
        <Button variant="secondary" className="w-full shadow-xl shadow-black/20">
          Вернуться в зал
        </Button>
      </NavLink>
    </div>
  </FullScreenCenter>
);
