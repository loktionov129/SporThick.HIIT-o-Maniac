import React from 'react';
import { History, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';

export const EmptyHistory: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 bg-slate-900/40 border border-slate-800/60 rounded-[32px] backdrop-blur-md relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/10 blur-[80px] rounded-full" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-600/10 blur-[80px] rounded-full" />

      <div className="relative mb-6">
        <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
        <div className="relative bg-slate-800 border border-slate-700 p-5 rounded-3xl shadow-xl">
          <History className="h-10 w-10 text-blue-500" />
        </div>
      </div>

      <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2 text-center">
        История пуста
      </h3>
      <p className="text-slate-400 text-sm text-center max-w-[260px] leading-relaxed mb-8">
        Ты еще не завершил ни одной сессии. Пора войти в историю Maniac Mode!
      </p>

      <Button 
        onClick={() => navigate('/')}
        variant="primary"
        className="mt-2 shadow-lg shadow-blue-600/20 px-8"
      >
        <Play size={18} className="mr-2 fill-current" />
        Начать тренировку
      </Button>
    </div>
  );
};
