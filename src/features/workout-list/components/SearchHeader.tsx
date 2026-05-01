import { Search, Plus } from 'lucide-react';
import { Input } from '../../../components/ui/Input';

interface SearchHeaderProps {
  query: string;
  onQueryChange: (val: string) => void;
  onCreate: () => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({ 
  query, 
  onQueryChange, 
  onCreate 
}) => (
  <div className="">
    <div className="">
      <Search 
        className="" 
        size={20} 
      />
      <Input
        placeholder="Поиск программы..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className=""
      />
    </div>

    <button 
      onClick={onCreate}
      className=""
      title="Создать тренировку"
    >
      <Plus size={26} strokeWidth={3} className="" />
    </button>
  </div>
);
