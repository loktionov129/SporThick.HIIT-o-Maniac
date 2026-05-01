import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { useModalStore } from '../../store/useModalStore';
import { Button } from './Button';
import { Card } from './Card';

export const ConfirmModal = () => {
  const { isOpen, options, closeModal } = useModalStore();

  if (!options) {
    return null;
  }
  
  const handleConfirm = () => {
    options.onConfirm();
    closeModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-surface-main/60 backdrop-blur-md"
          />

          {/* Используем Card как контейнер окна */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm z-10"
          >
            <Card className="relative overflow-hidden p-8 shadow-2xl border-text-primary/10">
              {/* Фоновая иконка для Danger */}
              {options.variant === 'danger' && (
                <div className="absolute -right-10 -top-10 text-brand-rose/5 pointer-events-none">
                  <AlertTriangle size={180} />
                </div>
              )}

              <div className="relative z-10 flex flex-col items-center text-center">
                {options.variant === 'danger' && (
                  <div className="size-16 bg-brand-rose/10 rounded-2xl flex items-center justify-center text-brand-rose mb-6">
                    <AlertTriangle size={32} />
                  </div>
                )}

                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-text-primary leading-none mb-3">
                  {options.title}
                </h3>
                
                <p className="text-sm text-text-muted leading-relaxed mb-8 px-2">
                  {options.message}
                </p>

                <div className="flex flex-col w-full gap-3">
                  <Button 
                    variant={options.variant === 'danger' ? 'danger' : 'primary'} 
                    onClick={handleConfirm}
                    fullWidth
                    className="py-4 uppercase font-black italic tracking-widest"
                  >
                    {options.confirmText || 'Подтвердить'}
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    onClick={closeModal}
                    fullWidth
                    className="py-3 text-[10px] uppercase font-black tracking-[0.2em]"
                  >
                    {options.cancelText || 'Отмена'}
                  </Button>
                </div>
              </div>

              {/* Кнопка закрытия */}
              <button 
                onClick={closeModal}
                className="absolute top-6 right-6 text-text-muted hover:text-text-primary cursor-pointer transition-colors p-1"
              >
                <X size={20} />
              </button>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
