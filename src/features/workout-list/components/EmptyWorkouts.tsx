import React from 'react';
import { Dumbbell, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';

export const EmptyWorkouts: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="">
        <div className="" />
        <div className="" />

        <div className="">
          <div className="" />
          <div className="">
            <Dumbbell className="" />
          </div>
        </div>

        <div className="">
          <h3 className="">
            Тренировок <br /> пока нет
          </h3>
          <p className="">
            Твой путь к телу мечты начинается здесь. Создай свою первую программу!
          </p>
        </div>

        <Button 
          onClick={() => navigate('/create-edit-workout')}
          variant="primary"
          className=""
        >
          <Plus size={20} className="" />
          <span className="">Создать программу</span>
        </Button>
      </div>
    </div>
  );
};
