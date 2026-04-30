import { DownloadCloud, UploadCloud } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface Props {
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTriggerImport: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export const BackupActions = ({ onExport, onImport, onTriggerImport, fileInputRef }: Props) => (
  <section className="space-y-4">
    <label className="text-[10px] font-black uppercase text-text-muted tracking-[0.2em] ml-2 opacity-80 italic">
      Резервное копирование
    </label>
    
    <div className="flex flex-col gap-3">
      <Button 
        onClick={onExport} 
        fullWidth 
        variant="primary" 
        className="py-5 gap-3 shadow-lg shadow-brand-blue/10"
      >
        <DownloadCloud size={20} /> 
        Экспортировать JSON
      </Button>
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={onImport} 
        accept=".json" 
        className="hidden" 
      />
      
      <Button 
        onClick={onTriggerImport} 
        fullWidth 
        variant="secondary" 
        className="py-5 gap-3"
      >
        <UploadCloud size={20} /> 
        Импортировать файл
      </Button>
    </div>
  </section>
);
