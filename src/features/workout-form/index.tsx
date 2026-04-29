import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Plus, ArrowLeft, Save } from 'lucide-react';
import useWorkoutStore from '../../store/useWorkoutStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { ExerciseItem } from './components/ExerciseItem';

const CreateEditWorkoutScreen: React.FC = () => {
  const [searchParams] = useSearchParams();
  const workoutId = searchParams.get('workoutId');
  const navigate = useNavigate();
  
  const workouts = useWorkoutStore((state) => state.workouts);
  const addWorkout = useWorkoutStore((state) => state.addWorkout);
  const updateWorkout = useWorkoutStore((state) => state.updateWorkout);

  const currentWorkout = workoutId ? workouts.find(w => w.id === workoutId) : null;

  const [name, setName] = useState(currentWorkout?.name || '');
  const [rounds, setRounds] = useState(currentWorkout?.rounds || 1);
  const [exercises, setExercises] = useState(
    currentWorkout?.exercises || [{ id: Date.now().toString(), name: '', duration: 30 }]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const workoutData = {
      name,
      exercises: exercises.filter(ex => ex.name.trim() !== ''),
      rounds: 1,
    };

    if (workoutId) updateWorkout(workoutId, workoutData);
    else addWorkout({ id: Date.now().toString(), ...workoutData });

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
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate(-1)} className="cursor-pointer p-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-black text-white uppercase tracking-tight">
          {workoutId ? 'Редактирование' : 'Новая тренировка'}
        </h2>
        <div className="w-10" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Input
          label="Название тренировки"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Напр. Утренняя жара"
          required
        />

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl mb-8 flex items-center justify-between">
          <div className="flex flex-col">
            <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold ml-1">
              Количество раундов (кругов)
            </label>
            <p className="text-xs text-slate-600 mt-1">Весь список повторится X раз</p>
          </div>
          
          <div className="flex items-center gap-4 bg-slate-800/50 p-2 rounded-xl border border-slate-700">
            <button 
              type="button"
              onClick={() => setRounds(Math.max(1, rounds - 1))}
              className="w-8 h-8 flex items-center justify-center bg-slate-700 rounded-lg text-white font-bold hover:bg-slate-600"
            >–</button>
            <span className="text-xl font-black text-blue-500 min-w-[20px] text-center">{rounds}</span>
            <button 
              type="button"
              onClick={() => setRounds(rounds + 1)}
              className="w-8 h-8 flex items-center justify-center bg-slate-700 rounded-lg text-white font-bold hover:bg-slate-600"
            >+</button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">Упражнения</label>
            <span className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">{exercises.length} всего</span>
          </div>

          <div className="space-y-3">
            {exercises.map((exercise, index) => (
              <ExerciseItem
                key={exercise.id}
                index={index}
                exercise={exercise}
                onUpdate={updateExercise}
                onRemove={removeExercise}
              />
            ))}
          </div>

          <Button 
            type="button" 
            variant="ghost" 
            fullWidth 
            onClick={addExercise}
            className="border-2 border-dashed border-slate-800 py-6 hover:border-slate-700"
          >
            <Plus size={20} />
            Добавить упражнение
          </Button>
        </div>

        <div className="pt-8 flex gap-4">
          <Button type="button" variant="ghost" className="flex-1" onClick={() => navigate('/')}>
            Отмена
          </Button>
          <Button type="submit" variant="primary" className="flex-[2]">
            <Save size={20} />
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditWorkoutScreen;
