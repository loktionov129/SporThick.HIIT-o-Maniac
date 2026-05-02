import React from 'react';
import { Search, Plus } from 'lucide-react';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { NavLink } from 'react-router-dom';

interface SearchHeaderProps {
  query: string;
  onQueryChange: (val: string) => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({ 
  query, 
  onQueryChange, 
}) => (
  <section className="px-2 shrink-0">
    <div className="flex items-center gap-3">
      <div className="relative flex-1 group">
        <Search 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-brand-blue transition-colors z-10 pointer-events-none" 
          size={20} 
        />
        <Input
          placeholder="Поиск программы..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="!pl-12 w-full"
        />
      </div>

      <NavLink to="/create-edit-workout">
        <Button 
          variant="primary"
          title="Создать тренировку"
          className="!size-14 !p-0 shrink-0 shadow-lg shadow-brand-blue/30"
        >
          <Plus size={28} strokeWidth={3} />
        </Button>
      </NavLink>
    </div>
  </section>
);
