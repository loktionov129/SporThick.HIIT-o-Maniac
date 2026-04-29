import React from 'react';
import { Trophy } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export const TimerFinished: React.FC<{ onFinish: () => void }> = ({ onFinish }) => (
  <div className="text-center animate-in fade-in zoom-in duration-500">
    <div className="relative mb-8">
      <div className="absolute inset-0 bg-yellow-500 blur-3xl opacity-20" />
      <div className="relative bg-yellow-500/20 p-8 rounded-full inline-block border border-yellow-500/20">
        <Trophy className="text-yellow-500 w-20 h-20" />
      </div>
    </div>
    <h2 className="text-4xl font-black text-white mb-3 tracking-tight">ПОБЕДА!</h2>
    <p className="text-slate-400 mb-10 text-lg">Тренировка успешно завершена.</p>
    <Button onClick={onFinish} fullWidth variant="primary" className="mt-10 uppercase tracking-[0.2em] py-5">
      Финиш
    </Button>
  </div>
);
