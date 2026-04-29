import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WorkoutList from './components/WorkoutList.tsx';
import CreateEditWorkoutScreen from './components/CreateEditWorkoutScreen.tsx';
import TimerScreen from './components/TimerScreen.tsx';

const App: React.FC = () => {

  return (
    <Router>
      <div className="min-h-screen bg-[#020617] text-slate-100 antialiased p-4">
        <div className="max-w-2xl mx-auto flex flex-col gap-8">
          <Routes>
            <Route path="/" element={<WorkoutList />} />
            <Route path="/timer" element={<TimerScreen />} />
            <Route path="/create-edit-workout" element={<CreateEditWorkoutScreen />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
