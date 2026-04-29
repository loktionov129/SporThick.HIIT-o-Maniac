import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.tsx';
import WorkoutList from './components/WorkoutList.tsx';
import CreateEditWorkoutScreen from './components/CreateEditWorkoutScreen.tsx';
import TimerScreen from './components/TimerScreen.tsx';

const App: React.FC = () => {

  return (
    <Router>
      <div className="container mx-auto p-4">
        <Header />
        <Routes>
          <Route path="/" element={<WorkoutList />} />
          <Route path="/timer" element={<TimerScreen />} />
          <Route path="/create-edit-workout"
            element={<CreateEditWorkoutScreen workoutId={null} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
