import { AlertCircle } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { FullScreenCenter } from './FullScreenCenter';

interface Props {
  onBack: () => void;
}

export const NotFoundView = ({ onBack }: Props) => (
  <FullScreenCenter>
    <div className="bg-red-500/10 p-6 rounded-full mb-6 border border-red-500/20">
      <AlertCircle className="text-red-500 w-12 h-12" />
    </div>
    <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-8">
      Тренировка не найдена
    </h2>
    <Button className="mt-10" variant="secondary" onClick={onBack}>
      Назад в меню
    </Button>
  </FullScreenCenter>
);
