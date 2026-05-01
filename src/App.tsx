import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ConfirmModal } from './components/ui/ConfirmModal';
import { PageContainer } from './components/Layout/PageContainer';
import { ToastContainer } from './components/ui/ToastContainer';
import { WorkoutList } from './features/workout-list';
import { CreateEditWorkoutScreen } from './features/workout-form';
import { TimerScreen } from './features/timer';
import { HistoryScreen } from './features/history';
import { DataScreen } from './features/data';
import { PresetsScreen } from './features/presets';
import { Onboarding } from './features/onboarding';

const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        <Route element={
          <PageContainer withBottomNav withHeader>
            <Outlet /> 
          </PageContainer>
        }>
          <Route path="/" element={<WorkoutList />} />
          <Route path="/history" element={<HistoryScreen />} />
          <Route path="/data" element={<DataScreen />} />
        </Route>
        <Route element={<PageContainer><Outlet /></PageContainer>}>
          <Route path="/presets" element={<PresetsScreen />} />
          <Route path="/timer" element={<TimerScreen />} />
          <Route path="/create-edit-workout" element={<CreateEditWorkoutScreen />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <div className="fixed inset-0 overflow-hidden bg-surface-main text-text-primary">
        <Onboarding />
        <AppContent />
        <ToastContainer />
        <ConfirmModal />
      </div>
    </Router>
  );
};
