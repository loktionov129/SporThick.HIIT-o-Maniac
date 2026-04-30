import { useRef } from 'react';
import { useWorkoutStore, useWorkoutActions } from '../../../store/useWorkoutStore';
import { downloadJson } from '../../../utils/fileActions';

export const useDataOperations = () => {
  const { workouts, history } = useWorkoutStore();
  const { importData, resetAll } = useWorkoutActions();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = { 
      workouts, 
      history, 
      exportedAt: new Date().toISOString(),
      app: 'SporThick HIIT'
    };
    const date = new Date().toLocaleDateString('ru-RU').replace(/\./g, '-');
    downloadJson(data, `sporthick-backup-${date}.json`);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (!Array.isArray(json.workouts) || !Array.isArray(json.history)) throw new Error();

        if (window.confirm('Внимание! Это полностью заменит текущие данные. Продолжить?')) {
          importData(json);
          alert('Данные успешно импортированы! 🔥');
        }
      } catch {
        alert('Ошибка: Файл поврежден или имеет неверный формат.');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleReset = () => {
    if (window.confirm('ВНИМАНИЕ! Это удалит ВСЕ данные. Ты уверен?')) {
      resetAll();
      alert('Все данные стерты. 🚀');
    }
  };

  return {
    handleExport,
    handleImport,
    handleReset,
    fileInputRef,
    triggerImport: () => fileInputRef.current?.click()
  };
};
