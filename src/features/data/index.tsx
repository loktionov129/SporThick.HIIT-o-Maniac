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
    <div className="space-y-8 pb-24 animate-in fade-in duration-500">
      <h2 className="text-xl font-black uppercase tracking-tight text-white italic">
        Управление данными
      </h2>

      <StorageInfo workoutsCount={workoutsCount} historyCount={historyCount} />

      <div className="space-y-4">
        <BackupActions 
          onExport={ops.handleExport}
          onImport={ops.handleImport}
          onTriggerImport={ops.triggerImport}
          fileInputRef={ops.fileInputRef}
        />
        <DangerZone onReset={ops.handleReset} />
      </div>
    </div>
  );
};
