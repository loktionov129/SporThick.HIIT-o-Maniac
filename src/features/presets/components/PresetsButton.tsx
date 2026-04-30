import { useNavigate } from 'react-router-dom';
import { Button } from "../../../components/ui/Button";
import { Library } from 'lucide-react';

export const PresetsButton = () => {
  const navigate = useNavigate();

  return <Button 
    onClick={() => navigate('/presets')}
    variant="secondary"
    className="mt-10 w-full py-8 border-2 border-dashed border-brand-blue/20 bg-brand-blue/5 gap-4"
  >
    <Library className="text-brand-blue" size={24} />
    <div className="text-left">
      <span className="block font-black uppercase italic text-sm text-text-primary">Библиотека шаблонов</span>
      <span className="block text-[10px] text-text-muted uppercase font-bold tracking-wider">Tabata, HIIT, AMRAP и другие</span>
    </div>
  </Button>;
};