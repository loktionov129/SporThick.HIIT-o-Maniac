import { NavLink } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { Pencil, Play, Trash2 } from "lucide-react";

export const WorkoutActions = ({ id, onDelete }: { id: string; onDelete: (id: string) => void }) => (
  <div className="flex items-center gap-2">
    <NavLink to={`/timer?workoutId=${id}`} className="flex-1">
      <Button variant="primary" fullWidth className="gap-3 py-4 shadow-lg shadow-brand-blue/20">
        <Play size={20} fill="currentColor" />
        <span className="text-xs font-black uppercase italic tracking-widest leading-none">СТАРТ</span>
      </Button>
    </NavLink>

    <NavLink to={`/workout/edit?workoutId=${id}`}>
      <Button variant="secondary" className="!size-14 !p-0 shadow-sm">
        <Pencil size={22} />
      </Button>
    </NavLink>

    <Button variant="danger" onClick={() => onDelete(id)} className="!size-14 !p-0 shadow-sm">
      <Trash2 size={22} />
    </Button>
  </div>
);
