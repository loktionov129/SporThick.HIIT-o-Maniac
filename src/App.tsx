import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { PageContainer } from './components/Layout/PageContainer';
import { WorkoutList } from './features/workout-list';
import { CreateEditWorkoutScreen } from './features/workout-form';
import { TimerScreen } from './features/timer';
import { HistoryScreen } from './features/history';
import { DataScreen } from './features/data';
import { BottomNav } from './components/Layout/BottomNav';
import './App.css';

const AppContent: React.FC = () => {
  const location = useLocation();
  const showBottomNav = location.pathname !== '/timer';

  return (
    <>
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
          path="/history" 
          element={
            <PageContainer withHeader maxWidth="md">
              <HistoryScreen />
            </PageContainer>
          } 
        />
        
        <Route 
          path="/data" 
          element={
            <PageContainer withHeader maxWidth="md">
              <DataScreen />
            </PageContainer>
          } 
        />

        <Route 
          path="/timer" 
          element={
            <PageContainer withHeader maxWidth="sm">
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

      {showBottomNav && <BottomNav />}
    </>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};
