import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
    <PageContainer className="" withBottomNav withHeader>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<WorkoutList />} />
          <Route path="/presets" element={<PresetsScreen  />} />
          <Route path="/history" element={<HistoryScreen />} />
          <Route path="/data" element={<DataScreen />} />
          <Route path="/timer" element={<TimerScreen />} />
          <Route path="/create-edit-workout" element={<CreateEditWorkoutScreen />} />
        </Routes>
      </AnimatePresence>
    </PageContainer>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <div className="">
        <Onboarding />
        <AppContent />
        <ToastContainer />
        <ConfirmModal />
      </div>
    </Router>
  );
};
