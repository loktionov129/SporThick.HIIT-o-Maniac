import React from 'react';
import { useNavigate } from 'react-router-dom';
import useWorkoutStore from '../../store/useWorkoutStore';
import { WorkoutCard } from './components/WorkoutCard';
import { EmptyWorkouts } from './components/EmptyWorkouts';

const WorkoutList: React.FC = () => {
  const workouts = useWorkoutStore((state) => state.workouts);
  const deleteWorkout = useWorkoutStore((state) => state.deleteWorkout);
  const navigate = useNavigate();

  const handleStart = (id: string) => navigate(`/timer?workoutId=${id}`);
  const handleEdit = (id: string) => navigate(`/create-edit-workout?workoutId=${id}`);
  const handleDelete = (id: string) => {
    if (confirm('Удалить эту тренировку?')) deleteWorkout(id);
  };

  if (workouts.length === 0) {
    return <EmptyWorkouts />;
  }

  return (
    <div className="grid gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
      {workouts.map((workout) => (
        <WorkoutCard
          key={workout.id}
          workout={workout}
          onStart={handleStart}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default WorkoutList;
