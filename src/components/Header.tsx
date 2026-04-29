import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC<{}> = () => {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">SporThick.HIIT-o-Maniac</h1>
      <button onClick={() => navigate('/create-edit-workout')} className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Workout
      </button>
    </header>
  );
};

export default Header;