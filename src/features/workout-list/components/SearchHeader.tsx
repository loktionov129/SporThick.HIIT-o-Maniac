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
  <div className="flex gap-3 sticky top-0 z-20 bg-surface-main/80 backdrop-blur-xl py-2 transition-colors duration-300">
    <div className="relative flex-1 group">
      <Search 
        className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-brand-blue transition-colors" 
        size={20} 
      />
      <Input
        placeholder="Поиск программы..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="pl-12 py-6 shadow-lg shadow-black/5 dark:shadow-none"
      />
    </div>

    <button 
      onClick={onCreate}
      className={`
        cursor-pointer flex items-center justify-center px-5 rounded-[22px] transition-all duration-300 shadow-xl 
        active:scale-90 bg-brand-blue text-white hover:bg-blue-500 shadow-brand-blue/20
      `}
      title="Создать тренировку"
    >
      <Plus size={26} strokeWidth={3} className="transition-transform hover:rotate-90 duration-500" />
    </button>
  </div>
);
