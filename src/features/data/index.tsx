import React, { useRef } from 'react';
import { DownloadCloud, UploadCloud, Database, Trash2, AlertTriangle, ShieldCheck } from 'lucide-react';
import useWorkoutStore from '../../store/useWorkoutStore';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export const DataScreen: React.FC = () => {
  const { workouts, history, importData, resetAll } = useWorkoutStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = { 
      workouts, 
      history, 
      exportedAt: new Date().toISOString(),
      app: 'SporThick HIIT'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = `sporthick-backup-${new Date().toLocaleDateString('ru-RU')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        
        if (json.workouts && Array.isArray(json.workouts)) {
          if (confirm('Внимание! Это полностью заменит текущие тренировки и историю. Продолжить?')) {
            importData(json);
            alert('Данные успешно импортированы! 🔥');
          }
        } else {
          alert('Ошибка: Неверный формат файла бэкапа.');
        }
      } catch (err) {
        alert('Ошибка при чтении файла. Убедитесь, что это валидный JSON.');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = ''; // Сброс инпута
  };

  return (
    <div className="space-y-8 pb-24 animate-in fade-in duration-500">
      <h2 className="text-xl font-black uppercase tracking-tight text-white italic">Управление данными</h2>

      {/* Инфо-карточка */}
      <Card className="!bg-blue-600/5 border-blue-500/20 p-6 relative overflow-hidden text-left">
        <div className="absolute -right-8 -top-8 text-blue-500/10 rotate-12">
          <ShieldCheck size={120} />
        </div>
        
        <div className="flex items-center gap-4 mb-6 relative z-10">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/20">
            <Database className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-white font-bold uppercase text-xs tracking-widest">Локальное хранилище</h3>
            <p className="text-slate-500 text-[10px] font-medium uppercase mt-0.5">Данные хранятся только в этом браузере</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 relative z-10">
          <div className="bg-[#161f35] p-4 rounded-2xl border border-slate-800/50">
            <span className="block text-2xl font-black text-blue-500 tabular-nums">{workouts.length}</span>
            <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Программ</span>
          </div>
          <div className="bg-[#161f35] p-4 rounded-2xl border border-slate-800/50">
            <span className="block text-2xl font-black text-emerald-500 tabular-nums">{history.length}</span>
            <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Сессий</span>
          </div>
        </div>
      </Card>

      {/* Кнопки действий */}
      <div className="space-y-4">
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-2">Резервное копирование</label>
          
          <Button onClick={handleExport} fullWidth variant="primary" className="py-5 gap-3 shadow-blue-600/10">
            <DownloadCloud size={20} />
            Экспортировать JSON
          </Button>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImport} 
            accept=".json" 
            className="hidden" 
          />
          <Button onClick={() => fileInputRef.current?.click()} fullWidth variant="secondary" className="py-5 gap-3 bg-[#161f35] hover:bg-[#1e293b]">
            <UploadCloud size={20} />
            Импортировать файл
          </Button>
        </div>

        {/* Опасная зона */}
{/* Опасная зона — FACTORY RESET */}
<div className="pt-10 space-y-4 text-left">
  <div className="flex items-center gap-2 px-2">
    <div className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.8)]" />
    <label className="text-[11px] font-black uppercase text-red-500 tracking-[0.25em]">
      Factory Reset
    </label>
  </div>
  
  <div className="relative group overflow-hidden rounded-[32px] border border-red-500/20 bg-red-500/[0.03] backdrop-blur-md p-8 transition-all hover:border-red-500/40">
    {/* Декоративная иконка на фоне */}
    <Trash2 size={120} className="absolute -right-6 -bottom-6 text-red-500/[0.04] -rotate-12 pointer-events-none transition-transform group-hover:scale-110 duration-700" />
    
    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
      <div className="space-y-3">
        <h4 className="text-white font-black uppercase text-base tracking-wider">
          Полный сброс приложения
        </h4>
        <p className="text-[12px] text-slate-400 leading-relaxed max-w-[320px]">
          Удалит все созданные программы и накопленную историю. 
          <span className="text-red-500/90 font-bold block mt-2 uppercase text-[10px] tracking-[0.1em] italic">
            Это действие невозможно отменить
          </span>
        </p>
      </div>
      
      <button 
        onClick={resetAll} 
        className="cursor-pointer group/btn relative flex items-center justify-center gap-3 bg-red-500/10 hover:bg-red-500 border border-red-500/20 text-red-500 hover:text-white px-8 py-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.15em] transition-all active:scale-95 shadow-xl shadow-red-500/5"
      >
        <Trash2 size={18} className="transition-transform group-hover/btn:rotate-12" />
        Стереть все данные
        
        {/* Эффект блика при наведении */}
        <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
      </button>
    </div>
  </div>
</div>

      </div>

      <p className="text-center text-[9px] text-slate-700 uppercase font-bold tracking-[0.3em]">
        SporThick HIIT • Build v1.0.8
      </p>
    </div>
  );
};
