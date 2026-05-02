import React from 'react';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import { useDataOperations } from './hooks/useDataOperations';
import { StorageInfo } from './components/StorageInfo';
import { BackupActions } from './components/BackupActions';
import { DangerZone } from './components/DangerZone';
import { SoundSettings } from '../../components/ui/SoundSettings';

export const DataScreen: React.FC = () => {
  const workoutsCount = useWorkoutStore((s) => s.workouts.length);
  const historyCount = useWorkoutStore((s) => s.history.length);
  const ops = useDataOperations();

  return (
    <div className="flex flex-col gap-5 pb-10">
      <h2 className="text-4xl font-black italic uppercase tracking-tighter text-text-primary px-2 mb-2">
        Данные
      </h2>

      <StorageInfo
        workoutsCount={workoutsCount}
        historyCount={historyCount}
      />

      <SoundSettings />
      
      <BackupActions 
        onExport={ops.handleExport}
        onImport={ops.handleImport}
        onTriggerImport={ops.triggerImport}
        fileInputRef={ops.fileInputRef}
      />

      <DangerZone onReset={ops.handleReset} />
    </div>
  );
};
