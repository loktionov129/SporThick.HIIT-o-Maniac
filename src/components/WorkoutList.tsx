import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2, Play, Dumbbell, ChevronRight } from 'lucide-react';
import useWorkoutStore from '../store/useWorkoutStore';
import Header from './Header.tsx';

const WorkoutList: React.FC = () => {
  const workouts = useWorkoutStore((state) => state.workouts);
  const deleteWorkout = useWorkoutStore((state) => state.deleteWorkout);
  const navigate = useNavigate();

  if (workouts.length === 0) {
    return (
      <div className="flex flex-col gap-8">
        <Header />
        <div className="flex flex-col items-center justify-center py-20 bg-slate-900/30 rounded-3xl border border-slate-800/50 backdrop-blur-sm">
          <div className="bg-slate-800/50 p-4 rounded-full mb-4">
            <Dumbbell className="h-10 w-10 text-slate-600" />
          </div>
          <p className="text-slate-400 font-medium">No workouts found</p>
          <p className="text-slate-600 text-sm mt-1">Ready to break some sweat?</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <Header />
      <div className="grid gap-4">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            onClick={() => navigate(`/timer?workoutId=${workout.id}`)}
            className="cursor-pointer group relative bg-slate-900/40 border border-slate-800/60 p-5 rounded-2xl transition-all duration-300 hover:bg-slate-800/40 hover:border-blue-500/30 hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
          >
            <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-blue-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-slate-100 truncate group-hover:text-blue-400 transition-colors">
                    {workout.name}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                    {workout.exercises.length} ex
                  </span>
                </div>
                
                <p className="text-sm text-slate-500 line-clamp-1 italic font-light">
                  {workout.exercises.length > 0 
                    ? workout.exercises.map((ex) => ex.name).join(' • ')
                    : 'No exercises added yet'}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <div className="cursor-pointer flex items-center text-[11px] font-black text-blue-500 uppercase tracking-[0.15em]">
                    <Play size={14} className="mr-1.5 fill-current" />
                    Start Session
                  </div>
                  <ChevronRight size={14} className="cursor-pointer text-slate-700 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/create-edit-workout?workoutId=${workout.id}`);
                  }}
                  className="cursor-pointer p-3 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all active:scale-90"
                  title="Edit"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm('Delete workout?')) deleteWorkout(workout.id);
                  }}
                  className="cursor-pointer p-3 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all active:scale-90"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutList;
