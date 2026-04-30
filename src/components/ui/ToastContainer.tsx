import { AnimatePresence, motion } from 'framer-motion';
import { useToastStore } from '../../store/useToastStore';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

const icons = {
  success: <CheckCircle2 size={18} className="text-brand-emerald" />,
  error: <AlertCircle size={18} className="text-brand-rose" />,
  info: <Info size={18} className="text-brand-blue" />,
};

export const ToastContainer = () => {
  const toasts = useToastStore((s) => s.toasts);

  return (
    <div className="fixed bottom-24 left-0 right-0 z-[200] pointer-events-none flex flex-col items-center gap-2 px-4">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            className="pointer-events-auto bg-surface-card/90 backdrop-blur-xl border border-text-muted/10 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[280px]"
          >
            {icons[toast.type]}
            <span className="text-[11px] font-black uppercase tracking-widest text-text-primary italic">
              {toast.message}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
