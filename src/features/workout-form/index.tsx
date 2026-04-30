import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Plus, ArrowLeft, Save, GripVertical  } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import useWorkoutStore from '../../store/useWorkoutStore';
import { Button } from '../../components/ui/Button';
import { ExerciseItem } from './components/ExerciseItem';
import { TimerInput } from '../../components/ui/TimerInput';
import { PlusMinusInput } from '../../components/ui/PlusMinusInput';

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
  const [restDuration, setRestDuration] = useState(currentWorkout?.restDuration || 0);
  const [exercises, setExercises] = useState(
    currentWorkout?.exercises || [{ id: Date.now().toString(), name: '', duration: 30 }]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }
    
    const workoutData = {
      name,
      exercises: exercises.filter(ex => ex.name.trim() !== ''),
      rounds,
      restDuration,
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

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(exercises);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setExercises(items);
  };

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-12 py-2">
        <button onClick={() => navigate(-1)} className="cursor-pointer p-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-black text-white uppercase tracking-wider text-center flex-1">
          {workoutId ? 'Редактирование' : 'Новая тренировка'}
        </h2>
        <div className="w-10" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Название */}
        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold ml-1">Название тренировки</label>
          <div className="relative group">
            {/* Тот самый эффект свечения при фокусе из макета */}
            <div className="absolute -inset-0.5 bg-blue-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="123"
              className="relative w-full bg-[#050b18] border border-slate-800 text-white px-6 py-4 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all text-lg font-bold"
            />
          </div>
        </div>

        {/* Секция параметров Раунды / Отдых */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Раунды */}
          <div className="bg-[#0b1224]/50 border border-slate-800/60 p-6 rounded-[24px] flex items-center justify-between">
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold italic">Раунды</label>
              <p className="text-[9px] text-slate-600 uppercase font-bold tracking-tighter">Круги упражнений</p>
            </div>
            
            <PlusMinusInput min={0} value={rounds} onChange={setRounds} />
          </div>

          {/* Отдых */}
          <div className="bg-[#0b1224]/50 border border-slate-800/60 p-5 rounded-2xl flex items-center justify-between">
            <div className="flex flex-col">
              <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold ml-1">Отдых</label>
              <p className="text-[9px] text-slate-600 uppercase font-bold tracking-tighter mt-0.5">Между упр-ми</p>
            </div>

            <TimerInput value={restDuration} onChange={setRestDuration} />
          </div>
        </div>

        {/* Список упражнений */}
        <div className="space-y-5">
          <div className="flex items-center justify-between px-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold italic">Упражнения</label>
            <span className="text-[10px] text-blue-500 font-black uppercase tracking-widest">{exercises.length} всего</span>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="exercises-list">
              {(provided) => (
                <div 
                  {...provided.droppableProps} 
                  ref={provided.innerRef} 
                  className="space-y-4"
                >
                  {exercises.map((exercise, index) => (
                    <Draggable key={exercise.id} draggableId={exercise.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`flex items-center gap-2 ${snapshot.isDragging ? 'z-50' : ''}`}
                        >
                          {/* Ручка захвата */}
                          <div 
                            {...provided.dragHandleProps} 
                            className="p-1 text-slate-700 hover:text-slate-500 cursor-grab active:cursor-grabbing"
                          >
                            <GripVertical size={20} />
                          </div>

                          <div className="flex-1">
                            <ExerciseItem
                              index={index}
                              exercise={exercise}
                              onUpdate={updateExercise}
                              onRemove={removeExercise}
                            />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <button
            type="button"
            onClick={addExercise}
            className="w-full py-5 border-2 border-dashed border-slate-800/60 rounded-[20px] text-slate-500 font-bold flex items-center justify-center gap-2 hover:border-blue-500/30 hover:text-slate-300 transition-all active:scale-[0.99] bg-[#0b1224]/20"
          >
            <Plus size={18} />
            Добавить упражнение
          </button>
        </div>

        <div className="sticky bottom-0 left-0 right-0 pt-6 pb-4 bg-gradient-to-t from-[#020617] via-[#020617] to-transparent">
          <div className="pt-8 flex gap-4">
            <Button type="button" variant="ghost" className="flex-1" onClick={() => navigate('/')}>Отмена</Button>
            <Button type="submit" variant="primary" className="flex-[2]"><Save size={20} /> Сохранить</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEditWorkoutScreen;
