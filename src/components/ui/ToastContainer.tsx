import { AnimatePresence, motion } from 'framer-motion';
import { useToastStore } from '../../store/useToastStore';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

const icons = {
  success: <CheckCircle2 size={18} className="" />,
  error: <AlertCircle size={18} className="" />,
  info: <Info size={18} className="" />,
};

export const ToastContainer = () => {
  const toasts = useToastStore((s) => s.toasts);

  return (
    <div className="fixed bottom-28 left-0 right-0 z-50 flex flex-col items-center gap-2 pointer-events-none px-6">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl pointer-events-auto backdrop-blur-xl bg-surface-card/90 border border-white/5"
          >
            <div className={`${
              toast.type === 'success' ? 'text-brand-emerald' : 
              toast.type === 'error' ? 'text-brand-rose' : 'text-brand-blue'
            }`}>
              {icons[toast.type]}
            </div>
            <span className="text-sm font-bold text-text-primary tracking-tight">
              {toast.message}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
