import React from 'react';
import useWorkoutStore from '../store/useWorkoutStore';
import { useNavigate } from 'react-router-dom';

const WorkoutList: React.FC<{}> = () => {
  const workouts = useWorkoutStore((state) => state.workouts);
  const deleteWorkout = useWorkoutStore((state) => state.deleteWorkout);
  const navigate = useNavigate();

  return (
    <ul className="space-y-2">
      {workouts.map(workout => (
        <li key={workout.id} className="bg-white p-4 rounded shadow flex justify-between items-center cursor-pointer" onClick={() => navigate(`/timer?workoutId=${workout.id}`)}>
          <div>
            <h2>{workout.name}</h2>
            <p>Exercises: {workout.exercises.map(exercise => exercise.name).join(', ')}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/create-edit-workout?workoutId=${workout.id}`)
              }}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteWorkout(workout.id);
              }}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default WorkoutList;