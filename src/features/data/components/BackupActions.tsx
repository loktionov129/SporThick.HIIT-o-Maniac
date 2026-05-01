import { DownloadCloud, UploadCloud } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface Props {
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTriggerImport: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export const BackupActions = ({ onExport, onImport, onTriggerImport, fileInputRef }: Props) => (
  <section className="">
    <label className="">
      Резервное копирование
    </label>
    
    <div className="">
      <Button 
        onClick={onExport} 
        fullWidth 
        variant="primary" 
        className=""
      >
        <DownloadCloud size={20} /> 
        Экспортировать JSON
      </Button>
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={onImport} 
        accept=".json" 
        className="" 
      />
      
      <Button 
        onClick={onTriggerImport} 
        fullWidth 
        variant="secondary" 
        className=""
      >
        <UploadCloud size={20} /> 
        Импортировать файл
      </Button>
    </div>
  </section>
);
