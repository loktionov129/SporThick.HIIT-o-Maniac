import { AlertCircle } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { FullScreenCenter } from './FullScreenCenter';

interface Props {
  onBack: () => void;
}

export const NotFoundView = ({ onBack }: Props) => (
  <FullScreenCenter>
    <div className="bg-brand-rose/10 p-6 rounded-[32px] mb-8 border border-brand-rose/20 relative">
      <div className="absolute inset-0 bg-brand-rose/20 blur-2xl rounded-full animate-pulse" />
      <AlertCircle className="text-brand-rose relative z-10" size={48} />
    </div>

    <div className="text-center space-y-3 mb-10">
      <h2 className="text-3xl font-black text-text-primary uppercase tracking-tighter italic leading-tight">
        Упс! Тренировка <br /> 
        <span className="text-brand-rose">не найдена</span>
      </h2>
      <p className="text-text-muted text-sm font-medium max-w-[240px] mx-auto opacity-80">
        Похоже, эта программа была удалена или ссылка на неё больше не работает.
      </p>
    </div>

    <Button 
      variant="secondary" 
      onClick={onBack}
      className="px-10 py-5 shadow-xl active:scale-95"
    >
      Назад в меню
    </Button>
  </FullScreenCenter>
);
