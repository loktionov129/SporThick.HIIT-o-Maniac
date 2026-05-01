import { AlertCircle } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { FullScreenCenter } from './FullScreenCenter';

interface Props {
  onBack: () => void;
}

export const NotFoundView = ({ onBack }: Props) => (
  <FullScreenCenter>
    <div className="">
      <div className="" />
      <AlertCircle className="" size={48} />
    </div>

    <div className="">
      <h2 className="">
        Упс! Тренировка <br /> 
        <span className="">не найдена</span>
      </h2>
      <p className="">
        Похоже, эта программа была удалена или ссылка на неё больше не работает.
      </p>
    </div>

    <Button 
      variant="secondary" 
      onClick={onBack}
      className=""
    >
      Назад в меню
    </Button>
  </FullScreenCenter>
);
