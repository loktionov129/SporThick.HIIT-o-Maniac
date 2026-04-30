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
    <div className="space-y-8 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-black uppercase tracking-tight text-text-primary italic px-1">
        Управление данными
      </h2>

      <StorageInfo workoutsCount={workoutsCount} historyCount={historyCount} />

      <div className="space-y-6">
        <BackupActions 
          onExport={ops.handleExport}
          onImport={ops.handleImport}
          onTriggerImport={ops.triggerImport}
          fileInputRef={ops.fileInputRef}
        />
        
        <div className="h-px bg-text-muted/10 w-full" />
        
        <DangerZone onReset={ops.handleReset} />
      </div>

      <p className="text-center text-[10px] text-text-muted uppercase font-black tracking-[0.3em] pt-4 opacity-50">
        SporThick HIIT • v1.0.8
      </p>
    </div>
  );
};
