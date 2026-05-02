import React from 'react';
import { DownloadCloud, UploadCloud } from 'lucide-react';
import { Button } from '@ui/Button';
import { DataCard } from './DataCard';

interface Props {
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTriggerImport: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export const BackupActions = ({ onExport, onImport, onTriggerImport, fileInputRef }: Props) => (
  <DataCard
    title="Бэкап"
    subtitle="Управление данными"
    icon={UploadCloud}
    bgIcon={DownloadCloud}
  >
    <div className="flex flex-col gap-3">
      <Button onClick={onExport} variant="secondary" className="gap-3 py-4 text-xs uppercase font-black italic tracking-widest">
        <DownloadCloud size={18} className="text-brand-blue" /> Экспортировать JSON
      </Button>
      
      <input type="file" ref={fileInputRef} onChange={onImport} accept=".json" className="hidden" />
      
      <Button onClick={onTriggerImport} variant="secondary" className="gap-3 py-4 text-xs uppercase font-black italic tracking-widest">
        <UploadCloud size={18} className="text-brand-emerald" /> Импортировать файл
      </Button>
    </div>
  </DataCard>
);
