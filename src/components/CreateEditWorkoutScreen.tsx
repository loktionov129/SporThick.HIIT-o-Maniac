import React, { useState } from 'react';
import useWorkoutStore from '../store/useWorkoutStore';
import { useParams, useNavigate } from 'react-router-dom';

interface CreateEditWorkoutScreenProps {
  workoutId: string | null;
}

const CreateEditWorkoutScreen: React.FC<CreateEditWorkoutScreenProps> = () => {
  const workouts = useWorkoutStore((state) => state.workouts);
  const addWorkout = useWorkoutStore((state) => state.addWorkout);
  const updateWorkout = useWorkoutStore((state) => state.updateWorkout);

  const navigate = useNavigate();
  const { workoutId } = useParams<{ workoutId: string }>();
  const currentWorkout = workoutId ? workouts.find(w => w.id === workoutId) : null;

  const [name, setName] = useState(currentWorkout?.name || '');
  const [exercises, setExercises] = useState<string[]>(currentWorkout?.exercises.map(e => e.name) || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (currentWorkout && workoutId) {
      updateWorkout(workoutId, { name });
    } else {
      addWorkout({
        id: Date.now().toString(),
        name,
        exercises: exercises.map((exerciseName, index) => ({
          id: `${Date.now()}-${index}`,
          name: exerciseName,
          duration: 30,
        })),
        rounds: 1,
      });
    }

    navigate('/');
  };

  const addExercise = () => {
    setExercises([...exercises, '']);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">Create/Edit Workout</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter workout name"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
        />
        <div>
          {exercises.map((exerciseName, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={exerciseName}
                onChange={(e) => {
                  const newExercises = [...exercises];
                  newExercises[index] = e.target.value;
                  setExercises(newExercises);
                }}
                placeholder={`Exercise ${index + 1}`}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}
        </div>
        <button type="button" onClick={addExercise} className="bg-green-500 text-white px-4 py-2 rounded">
          Add Exercise
        </button>
        <div className="flex justify-between space-x-2">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button>
          <button type="button" onClick={() => navigate('/')} className="bg-red-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditWorkoutScreen;