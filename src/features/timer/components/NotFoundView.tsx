import { AlertCircle } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { FullScreenCenter } from './FullScreenCenter';
import { NavLink } from 'react-router-dom';

export const NotFoundView = () => (
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

    <NavLink to="/">
      <Button variant="secondary"className="">
        Назад в меню
      </Button>
    </NavLink>
  </FullScreenCenter>
);
