import React from 'react';
import { Search, Plus } from 'lucide-react';
import { Input } from '@ui/Input';

interface SearchHeaderProps {
  query: string;
  onQueryChange: (val: string) => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({ query, onQueryChange }) => (
  <section className="px-2 shrink-0">
    <div className="relative group">
      <Search 
        className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-brand-blue transition-colors z-10 pointer-events-none" 
        size={20} 
      />
      <Input
        placeholder="Поиск программы..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="!pl-12 w-full shadow-sm bg-surface-card/50"
      />
      {query && (
        <button 
          onClick={() => onQueryChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
        >
          <Plus size={18} className="rotate-45" />
        </button>
      )}
    </div>
  </section>
);
