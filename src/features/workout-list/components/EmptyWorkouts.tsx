import React from 'react';
import { Dumbbell, Plus } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { NavLink } from 'react-router-dom';

export const EmptyWorkouts: React.FC = () => {
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

        <NavLink to="/create-edit-workout">
          <Button variant="primary"className="">
            <Plus size={20} className="" />
            <span className="">Создать программу</span>
          </Button>
        </NavLink>
      </div>
    </div>
  );
};
