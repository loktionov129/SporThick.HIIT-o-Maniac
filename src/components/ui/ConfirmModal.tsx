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
        <div className="">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className=""
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className=""
          >
            {options.variant === 'danger' && (
              <div className="">
                <AlertTriangle size={160} />
              </div>
            )}

            <div className="">
              <h3 className="">
                {options.title}
              </h3>
              <p className="">
                {options.message}
              </p>

              <div className="">
                <Button 
                  variant={options.variant === 'danger' ? 'danger' : 'primary'} 
                  onClick={handleConfirm}
                  className=""
                >
                  {options.confirmText || 'Подтвердить'}
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={closeModal}
                  className=""
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
