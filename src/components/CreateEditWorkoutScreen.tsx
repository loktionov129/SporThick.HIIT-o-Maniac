import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Plus, Trash2, ArrowLeft, Save, Clock } from 'lucide-react';
import useWorkoutStore from '../store/useWorkoutStore';

const CreateEditWorkoutScreen: React.FC = () => {
  const [searchParams] = useSearchParams();
  const workoutId = searchParams.get('workoutId');
  
  const workouts = useWorkoutStore((state) => state.workouts);
  const addWorkout = useWorkoutStore((state) => state.addWorkout);
  const updateWorkout = useWorkoutStore((state) => state.updateWorkout);
  const navigate = useNavigate();

  const currentWorkout = workoutId ? workouts.find(w => w.id === workoutId) : null;

  const [name, setName] = useState(currentWorkout?.name || '');
  const [exercises, setExercises] = useState(
    currentWorkout?.exercises || [{ id: '1', name: '', duration: 30 }]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const workoutData = {
      name,
      exercises: exercises.filter(ex => ex.name.trim() !== ''),
      rounds: 1,
    };

    if (workoutId) {
      updateWorkout(workoutId, workoutData);
    } else {
      addWorkout({
        id: Date.now().toString(),
        ...workoutData,
      });
    }
    navigate('/');
  };

  const addExercise = () => {
    setExercises([...exercises, { id: Date.now().toString(), name: '', duration: 30 }]);
  };

  const removeExercise = (id: string) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const updateExercise = (id: string, field: 'name' | 'duration', value: string | number) => {
    setExercises(exercises.map(ex => ex.id === id ? { ...ex, [field]: value } : ex));
  };

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate(-1)} className="cursor-pointer p-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-black text-white uppercase tracking-tight">
          {workoutId ? 'Редактирование тренировки' : 'Добавление тренировки'}
        </h2>
        <div className="w-10" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold ml-1">
            Название тренировки
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Разминка"
            required
            className="w-full bg-slate-900 border border-slate-800 text-white px-5 py-4 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors text-lg font-semibold"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
              Упражнения
            </label>
            <span className="text-[10px] text-blue-500 font-bold">{exercises.length} Всего</span>
          </div>

          <div className="space-y-3">
            {exercises.map((exercise, index) => (
              <div key={exercise.id} className="group bg-slate-900/50 border border-slate-800 p-4 rounded-2xl flex items-center gap-4 transition-all focus-within:border-slate-700">
                <div className="flex-shrink-0 w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-blue-500 font-black italic shadow-inner group-focus-within:bg-blue-500 group-focus-within:text-white transition-colors">
                  {index + 1}
                </div>
                
                <input
                  type="text"
                  value={exercise.name}
                  onChange={(e) => updateExercise(exercise.id, 'name', e.target.value)}
                  placeholder="Анжуманя"
                  required
                  className="flex-1 bg-transparent text-white font-medium focus:outline-none placeholder:text-slate-700"
                />

                <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-2 rounded-xl">
                  <Clock size={14} className="text-slate-500" />
                  <input
                    type="number"
                    value={exercise.duration}
                    onChange={(e) => updateExercise(exercise.id, 'duration', parseInt(e.target.value) || 0)}
                    className="w-10 bg-transparent text-white text-sm font-bold focus:outline-none text-center"
                  />
                  <span className="text-[10px] text-slate-500 font-bold">s</span>
                </div>

                <button
                  type="button"
                  onClick={() => removeExercise(exercise.id)}
                  className="cursor-pointer p-2 text-slate-600 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addExercise}
            className="cursor-pointer w-full py-4 border-2 border-dashed border-slate-800 rounded-2xl text-slate-500 font-bold flex items-center justify-center gap-2 hover:border-slate-700 hover:text-slate-400 transition-all active:scale-[0.98]"
          >
            <Plus size={20} />
            Добавить упражнение
          </button>
        </div>

        <div className="pt-8 flex gap-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="cursor-pointer flex-1 px-6 py-4 rounded-2xl font-bold text-slate-400 hover:bg-slate-900 transition-all"
          >
            Отмена
          </button>
          <button
            type="submit"
            className="cursor-pointer flex-[2] bg-blue-600 text-white px-6 py-4 rounded-2xl font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 active:scale-95"
          >
            <Save size={20} />
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditWorkoutScreen;
