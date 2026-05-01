import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { SoundToggle } from '../ui/SoundToggle';

export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="">
      <div className="">
        <div 
          className="" 
          onClick={() => navigate('/')}
        >
          <div className="">
            <div className="" />
            <div className="">
              <Activity className="" size={24} />
            </div>
          </div>
          
          <div className="">
            <h1 className="">
              SporThick
              <span className="">.</span>
              <span className="">HIIT</span>
            </h1>
            <span className="">
              Maniac Mode
            </span>
          </div>
        </div>

        <SoundToggle />
      </div>

      <div className="" />
    </header>
  );
};
