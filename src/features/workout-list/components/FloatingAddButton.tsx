import { Plus } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Button } from '@ui/Button';

export const FloatingAddButton = () => (
  <div className="fixed bottom-24 left-1/2 translate-x-[140px] max-md:left-auto max-md:right-6 max-md:translate-x-0 z-50">
    <NavLink 
      to="/workout/create" 
      title="Создать новую программу" 
      className="group block"
    >
      <Button 
        variant="primary"
        aria-label="Создать тренировку"
        className="
          !size-16 !p-0 rounded-2xl 
          shadow-[0_8px_30px_rgb(59,130,246,0.5)] 
          opacity-90 backdrop-blur-sm
          group-hover:opacity-100 group-hover:scale-110 
          transition-all duration-300
        "
      >
        <Plus 
          size={32} 
          strokeWidth={3} 
          className="transition-transform duration-500 group-hover:rotate-90" 
        />
      </Button>
    </NavLink>
  </div>
);
