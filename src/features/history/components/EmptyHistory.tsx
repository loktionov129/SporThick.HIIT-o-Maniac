import React from 'react';
import { History, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';

export const EmptyHistory: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="" />
      <div className="" />

      <div className="">
        <div className="" />
        <div className="">
          <History className="" />
        </div>
      </div>

      <div className="">
        <h3 className="">
          История пуста
        </h3>
        <p className="">
          Ты еще не завершил ни одной сессии. Пора войти в историю <span className="">Maniac Mode</span>!
        </p>
      </div>

      <Button 
        onClick={() => navigate('/')}
        variant="primary"
        className=""
      >
        <Play size={20} className="" />
        В зал
      </Button>
    </div>
  );
};
