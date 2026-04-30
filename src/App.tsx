import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from './components/ui/ToastContainer';
import { PageContainer } from './components/Layout/PageContainer';
import { MainLayout } from './components/Layout/MainLayout';
import { WorkoutList } from './features/workout-list';
import { CreateEditWorkoutScreen } from './features/workout-form';
import { TimerScreen } from './features/timer';
import { HistoryScreen } from './features/history';
import { DataScreen } from './features/data';
import { PresetsScreen } from './features/presets';
import './App.css';

const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<WorkoutList />} />
          <Route path="/presets" element={<PresetsScreen  />} />
          <Route path="/history" element={<HistoryScreen />} />
          <Route path="/data" element={<DataScreen />} />
        </Route>

        <Route path="/timer" element={
          <PageContainer withHeader maxWidth="sm" className="animate-in fade-in zoom-in-95">
            <TimerScreen />
          </PageContainer>
        } />

        <Route path="/create-edit-workout" element={
          <PageContainer maxWidth="md" className="animate-in slide-in-from-right">
            <CreateEditWorkoutScreen />
          </PageContainer>
        } />
      </Routes>
    </AnimatePresence>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-surface-main transition-colors duration-300">
        <AppContent />
        <ToastContainer />
      </div>
    </Router>
  );
};
