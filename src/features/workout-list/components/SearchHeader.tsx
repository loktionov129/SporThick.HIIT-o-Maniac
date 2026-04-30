import { Search, Plus } from 'lucide-react';
import { Input } from '../../../components/ui/Input';

export const SearchHeader = ({ query, onQueryChange, onCreate }: any) => (
  <div className="flex gap-3 sticky top-0 z-20 bg-[#020617]/80 backdrop-blur-md py-2">
    <div className="relative flex-1">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
      <Input
        placeholder="Поиск..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="pl-12 py-6 bg-slate-900/50 border-slate-800 focus:border-blue-500/50"
      />
    </div>
    <button 
      onClick={onCreate}
      className="bg-white text-slate-950 px-5 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg"
    >
      <Plus size={24} />
    </button>
  </div>
);
