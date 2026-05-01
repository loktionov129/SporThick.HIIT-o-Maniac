import React from 'react';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import { useDataOperations } from './hooks/useDataOperations';
import { StorageInfo } from './components/StorageInfo';
import { BackupActions } from './components/BackupActions';
import { DangerZone } from './components/DangerZone';

export const DataScreen: React.FC = () => {
  const workoutsCount = useWorkoutStore((s) => s.workouts.length);
  const historyCount = useWorkoutStore((s) => s.history.length);
  const ops = useDataOperations();

  return (
    <div className="">
      <h2 className="">
        Управление данными
      </h2>

      <StorageInfo workoutsCount={workoutsCount} historyCount={historyCount} />

      <div className="">
        <BackupActions 
          onExport={ops.handleExport}
          onImport={ops.handleImport}
          onTriggerImport={ops.triggerImport}
          fileInputRef={ops.fileInputRef}
        />
        
        <div className="" />
        
        <DangerZone onReset={ops.handleReset} />
      </div>

      <p className="">
        SporThick HIIT • v1.0.8
      </p>
    </div>
  );
};
