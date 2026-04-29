import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { PageContainer } from './components/Layout/PageContainer';
import WorkoutList from './features/workout-list';
import CreateEditWorkoutScreen from './features/workout-form';
import TimerScreen from './features/timer';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <PageContainer withHeader maxWidth="md">
              <WorkoutList />
            </PageContainer>
          } 
        />
        
        <Route 
          path="/timer" 
          element={
            <PageContainer maxWidth="sm">
              <TimerScreen />
            </PageContainer>
          } 
        />

        <Route 
          path="/create-edit-workout" 
          element={
            <PageContainer maxWidth="md">
              <CreateEditWorkoutScreen />
            </PageContainer>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
