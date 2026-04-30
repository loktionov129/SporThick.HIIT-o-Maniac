import { DownloadCloud, UploadCloud } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface Props {
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTriggerImport: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export const BackupActions = ({ onExport, onImport, onTriggerImport, fileInputRef }: Props) => (
  <section className="space-y-3">
    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-2">
      Резервное копирование
    </label>
    <Button onClick={onExport} fullWidth variant="primary" className="py-5 gap-3">
      <DownloadCloud size={20} /> Экспортировать JSON
    </Button>
    <input type="file" ref={fileInputRef} onChange={onImport} accept=".json" className="hidden" />
    <Button onClick={onTriggerImport} fullWidth variant="secondary" className="py-5 gap-3 bg-[#161f35]">
      <UploadCloud size={20} /> Импортировать файл
    </Button>
  </section>
);
