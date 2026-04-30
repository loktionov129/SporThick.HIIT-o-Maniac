import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { useModalStore } from '../../store/useModalStore';
import { Button } from './Button';

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
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-surface-main/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm bg-surface-card border border-text-muted/10 p-8 rounded-[40px] shadow-2xl overflow-hidden"
          >
            {options.variant === 'danger' && (
              <div className="absolute -top-10 -right-10 text-brand-rose/5 -rotate-12">
                <AlertTriangle size={160} />
              </div>
            )}

            <div className="relative z-10">
              <h3 className="text-2xl font-black text-text-primary uppercase italic tracking-tighter mb-2">
                {options.title}
              </h3>
              <p className="text-text-muted text-sm font-medium leading-relaxed mb-8">
                {options.message}
              </p>

              <div className="flex flex-col gap-3">
                <Button 
                  variant={options.variant === 'danger' ? 'danger' : 'primary'} 
                  onClick={handleConfirm}
                  className="py-4"
                >
                  {options.confirmText || 'Подтвердить'}
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={closeModal}
                  className="py-4"
                >
                  {options.cancelText || 'Отмена'}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
