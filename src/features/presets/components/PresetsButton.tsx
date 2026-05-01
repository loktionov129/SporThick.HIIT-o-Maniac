import { useNavigate } from 'react-router-dom';
import { Button } from "../../../components/ui/Button";
import { Library } from 'lucide-react';

export const PresetsButton = () => {
  const navigate = useNavigate();

  return <Button 
    onClick={() => navigate('/presets')}
    variant="secondary"
    className=""
  >
    <Library className="" size={24} />
    <div className="">
      <span className="">Библиотека шаблонов</span>
      <span className="">Tabata, HIIT, AMRAP и другие</span>
    </div>
  </Button>;
};