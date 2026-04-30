export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

export interface ToastState {
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
}
